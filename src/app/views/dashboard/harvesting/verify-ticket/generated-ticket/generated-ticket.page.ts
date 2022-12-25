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
      scale_ticket: ['', [Validators.required]],
      scale_ticket_weight: ['', [Validators.required]],
      test_weight: ['', [Validators.required]],
      protein_content: ['', [Validators.required]],
      moisture_content: ['', [Validators.required]],
      scale_ticket_docs: [''],
      scale_ticket_weight_docs: [''],
      status:['pending'],
    });
    console.log(
      'Ticket-ID',
      this.router.getCurrentNavigation().extras.state.ticketId
    );
    this.ticketID = this.router.getCurrentNavigation().extras.state.ticketId;
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
    console.log(this.generateTicketFormTruck.value);
    if(this.role === 'truck-driver'){
      this.harvestingService.updateTicket(this.ticketID,this.generateTicketFormTruck.value)
      .subscribe(
        (res: any) => {
            console.log('Response Ticket:',res);
            if(res.status === 200){
              this.generateTicketFormTruck.reset();
              this.toastService.presentToast(res.message,'success');
            }else{
              console.log('Something happened :)');
              this.toastService.presentToast(res.mssage,'danger');
            }
          },
        (err) => {
          this.toastService.presentToast(err,'danger');
          console.log('Error:',err);
        },
      );
    }else{
      this.harvestingService.updateTicket(this.ticketID,'verified')
      .subscribe(
        (res: any) => {
            console.log('Response Verify Ticket::',res);
            if(res.status === 200){
              // this.generateTicketFormTruck.reset();
              this.toastService.presentToast(res.message,'success');
            }else{
              console.log('Something happened :)');
              this.toastService.presentToast(res.mssage,'danger');
            }
          },
        (err) => {
          this.toastService.presentToast(err,'danger');
          console.log('Error:',err);
        },
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
      console.log('Ticket Verify:', res);
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
  patchKartForm(){

  }
}
