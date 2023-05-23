/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HarvestingService } from './../../harvesting.service';
import { BehaviorSubject, Subject } from 'rxjs';
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
  isLoadingTicket$;

  // isLoadingKartTicket: boolean;
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  ticketSub;
  fieldPivot; //field/pivot
  fieldPivotSL; //field/pivot-sl

  public loadingSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private harvestingService: HarvestingService,
    private toastService: ToastService
  ) { }

  async ionViewDidLeave() {
    this.DataDestroy();
  }

  DataDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    // this.ticketSub.unsubscribe();
    // this.isLoadingTicket$.unsubscribe();
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.initForm();

    this.ticket = JSON.parse(this.router.getCurrentNavigation().extras.state?.ticket);

    console.log('Ticket: ', this.ticket);

    this.ticketID = this.ticket.id;
    this.fieldPivot = this.ticket.field_name;

    this.fieldPivotSL = this.ticket.split_field_name == undefined ? '' : this.ticket.split_field_name;

    if (this.ticket) {
      this.generateTicketFormTruck.patchValue({
        ticketId: this.ticket.id,
        fieldId: this.ticket.field_id,
        destination: this.ticket.destination,
        farmId: this.ticket.farm_id,
        cropName: this.ticket.crop_name,
      });
    }

    if (this.role.includes('Truck Driver')) {
      this.initApis();
      this.initObservables();
    } else {
      // this.initKartApis();
      // this.initKartObservables();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  initForm() {
    this.generateTicketFormTruck = this.formBuilder.group({
      // scaleTicket: ['', [Validators.required]],
      NetWeight: [0, [Validators.required]],
      NetWeight2: [0, [Validators.required]],
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
      status: ['pending'],
      image_1: [''],
      image_2: [''],
    });
    this.generateTicketFormTruck.valueChanges.subscribe((value) => {
      if (value.NetWeight !== value.NetWeight2) {
        this.generateTicketFormTruck
          .get('NetWeight')
          .setErrors({ mustMatch: true });
        this.generateTicketFormTruck
          .get('NetWeight2')
          .setErrors({ mustMatch: true });
      } else {
        this.generateTicketFormTruck.get('NetWeight').setErrors(null);
        this.generateTicketFormTruck.get('NetWeight2').setErrors(null);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  onSelectedFiles(file, name) {
    // if (name === 'upload_1') {
    //   this.upload_1 = !this.upload_1;
    //   if (file.target.files && file.target.files[0]) {
    //     const reader = new FileReader();
    //     reader.onload = (_event: any) => {
    //       this.generateTicketFormTruck.controls.image_1?.setValue(
    //         file.target.files[0]
    //       );
    //     };
    //     reader.readAsDataURL(file.target.files[0]);
    //   } else {
    //   }
    // }
    if (name === 'upload_2') {
      this.upload_2 = !this.upload_2;
      if (file.target.files && file.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.generateTicketFormTruck.controls.image_2?.setValue(
            file.target.files[0]
          );
        };
        reader.readAsDataURL(file.target.files[0]);
      } else {
      }
    }
  }

  initApis() {
    this.harvestingService.getTicketById(this.ticketID, 'verify-ticket-truck');
  }

  initObservables() {
    this.harvestingService.ticket$.subscribe((res) => {
      console.log('Res:', res);
      this.ticketData = res;
    });

    this.isLoadingTicket$ = this.harvestingService.ticketLoading$;
  }

  // initKartApis() {
  //   this.harvestingService.getTicketById(this.ticketID, 'verify-ticket-kart');
  // }

  // initKartObservables() {
  //   this.harvestingService.ticket$.subscribe((res) => {
  //     console.log('Ticket Kart Verify:', res);
  //     this.ticketData = res;
  //   });
  //   this.isLoadingTicket$ = this.harvestingService.ticketLoading$;
  // }
  submit() {
    if (this.role.includes('Truck Driver')) {
      // Form Data
      const formData: FormData = new FormData();
      formData.append(
        'generateTicketFormTruck',
        JSON.stringify(this.generateTicketFormTruck.value)
      );
      formData.append('operation', 'completeTicket');
      // formData.append(
      //   'image_1',
      //   this.generateTicketFormTruck.get('image_1').value
      // );
      formData.append(
        'image_2',
        this.generateTicketFormTruck.get('image_2').value
      );
      console.log(this.generateTicketFormTruck.value);
      console.log(formData);

      this.loadingSpinner.next(true);
      this.harvestingService.truckDriverCompleteTicket(formData).subscribe(
        (response: any) => {
          console.log('Response', response);
          if (response.status === 200) {

            //stop loader
            this.loadingSpinner.next(false);

            // reset
            this.generateTicketFormTruck.reset();
            this.fieldPivot = '';
            this.fieldPivotSL = '';

            // navigate
            this.router.navigate(['/tabs/home/harvesting/verify-ticket']);

            //toast
            this.toastService.presentToast(response.message, 'success');
          } else {
            console.log('Something happened :)');
            this.loadingSpinner.next(false);
            this.toastService.presentToast(response.message, 'danger');
          }
        },
        (err) => {
          this.toastService.presentToast(err, 'danger');
          this.loadingSpinner.next(false);
          console.log('Error:', err);
        }
      );
    } else {
      // const payload = { operation: 'verifyTicket', ticketId: this.ticket.id };
      const formData: FormData = new FormData();
      formData.append(
        'generateTicketFormTruck',
        JSON.stringify(this.generateTicketFormTruck.value)
      );
      formData.append('operation', 'verifyTicket');
      formData.append('ticketId', this.ticket.id);
      this.loadingSpinner.next(true);
      this.harvestingService.kartOperatorVerifyTickets(formData).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            this.toastService.presentToast(res.message, 'success');

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          this.toastService.presentToast(err, 'danger');
          console.log('Error:', err);
          this.loadingSpinner.next(false);

        }
      );
    }
  }
}
