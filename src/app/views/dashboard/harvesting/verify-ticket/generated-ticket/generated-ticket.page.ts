/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HarvestingService } from './../../harvesting.service';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-generated-ticket',
  templateUrl: './generated-ticket.page.html',
  styleUrls: ['./generated-ticket.page.scss'],
})
export class GeneratedTicketPage implements OnInit {
  role: any;
  generateTicketFormTruck: FormGroup;
  ticketID: any;
  ticket: any;
  // ticket data
  ticketData: any;

  //loaders
  isLoadingTicket$: Observable<any>;

  // isLoadingKartTicket: boolean;
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private harvestingService: HarvestingService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.generateTicketFormTruck = this.formBuilder.group({
      scaleTicket: ['', [Validators.required]],
      scaleTicketWeight: ['', [Validators.required]],
      testWeight: ['', [Validators.required]],
      proteinContent: ['', [Validators.required]],
      moistureContent: ['', [Validators.required]],
      ticketId: [''],
      fieldId: [''],
      destination: [''],
      farmId: [''],
      cropName: [''],
      scale_ticket_docs: [''],
      scale_ticket_weight_docs: [''],
      status: ['pending']
    });

    console.log(
      'Ticket',
      JSON.parse(this.router.getCurrentNavigation().extras.state?.ticket)
    );
    this.ticket = JSON.parse(
      this.router.getCurrentNavigation().extras.state?.ticket
    );
    this.ticketID = this.ticket.id;

    if (this.ticket) {
      this.generateTicketFormTruck.patchValue({
        ticketId: this.ticket.id,
        fieldId: this.ticket.field_id,
        destination: this.ticket.destination,
        farmId: this.ticket.farm_id,
        cropName: this.ticket.crop_name,
      });
    }

    if (this.role === 'truck-driver') {
      this.initApis();
      this.initObservables();
    } else {
      this.initKartApis();
      this.initKartObservables();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  goBack() {
    this.location.back();
  }

  submit() {
    // console.log(this.generateTicketFormTruck.value);
    if (this.role === 'truck-driver') {
      this.harvestingService.truckDriverCompleteTicket(
        'completeTicket',
        this.generateTicketFormTruck.value
      )
      .subscribe(
        (response: any) => {
          console.log('Response', response);
          if (response.status === 200) {
            this.generateTicketFormTruck.reset();
            this.goBack();
            this.toastService.presentToast(response.message, 'success');
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(response.message, 'danger');
          }
        },
        (err) => {
          this.toastService.presentToast(err, 'danger');
          console.log('Error:', err);
        }
      );
    } else {
      let payload = { operation: 'verifyTicket', ticketId: this.ticket.id };
      this.harvestingService.kartOperatorVerifyTickets(payload).subscribe(
        (res: any) => {
          if (res.status === 200) {
            // this.generateTicketFormTruck.reset();
            this.toastService.presentToast(res.message, 'success');
            this.goBack();
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          this.toastService.presentToast(err, 'danger');
          console.log('Error:', err);
        }
      );
    }
  }

  onSelectedFiles(file, name) {
    console.log('file:', file);

    if (name === 'upload_1') {
      this.upload_1 = !this.upload_1;
    }
    if (name === 'upload_2') {
      this.upload_2 = !this.upload_2;
    }
  }

  initApis() {
    this.harvestingService.getTicketById(this.ticketID, 'verify-ticket-truck');
  }

  initObservables() {
    this.harvestingService.ticket$.subscribe((res) => {
      // console.log('Ticket Verify:', res);
      this.ticketData = res;
    });

    this.isLoadingTicket$ = this.harvestingService.ticketLoading$;
  }

  initKartApis() {
    this.harvestingService.getTicketById(this.ticketID, 'verify-ticket-kart');
  }

  initKartObservables() {
    this.harvestingService.ticket$.subscribe((res) => {
      console.log('Ticket Kart Verify:', res);
      this.ticketData = res;
    });
    this.isLoadingTicket$ = this.harvestingService.ticketLoading$;
  }
}
