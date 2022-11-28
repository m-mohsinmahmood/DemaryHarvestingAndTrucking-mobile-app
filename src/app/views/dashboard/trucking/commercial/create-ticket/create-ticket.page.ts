import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {

  options: any;
  rateSheetImg: string[] = [];
  originDocs: string[] = [];
  customDocs: string[] = [];

  roleOptions = ['dispatcher', 'truck-driver'];
  role = this.roleOptions[1];
  createTicketFormDispatcher: FormGroup;
  createTicketFormTruckDriver: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.createTicketFormDispatcher = this.formBuilder.group({
      ticketNo: ['', [Validators.required]],
      dispatcherName: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      uploadFile: ['', []],
      loadDate: ['', [Validators.required]],
      driverName: ['', [Validators.required]],
      load: ['', [Validators.required]],
      rateType: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      dispatcherNotes: ['', [Validators.required]],
    });

    this.createTicketFormTruckDriver = this.formBuilder.group({
      deliveryTicket: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      truckDriver: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      rateSheetUpload: ['', [Validators.required]],
      load: ['', [Validators.required]],
      rateType: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      truck: ['', [Validators.required]],
      ticket: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      originBeginingOdometerReading: ['', [Validators.required]],
      originEmptyWeight: ['', [Validators.required]],
      originLoadedWeight: ['', [Validators.required]],
      originWeightLoad1: ['', [Validators.required]],
      originalDocsUpload: ['', [Validators.required]],
      destinationEndingnOdometerReading: ['', [Validators.required]],
      destinationLoadedWeight: ['', [Validators.required]],
      destinationEmptyWeight: ['', [Validators.required]],
      originWeightLoad2: ['', [Validators.required]],
      weightLoad: ['', [Validators.required]],
      scaleTicket: ['', [Validators.required]],
      destinationDeliveryLoad: ['', [Validators.required]],
      documentsUpload: ['', [Validators.required]],
      totalTripMiles: ['', [Validators.required]],
      deadHeadMiles: ['', [Validators.required]],
      totalJobMiles: ['', [Validators.required]],
      driverNotes: ['', [Validators.required]],
    });
  }

  chooseImage(event) {
    if (event.target.name === 'rateSheet') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.rateSheetImg.push(URL.createObjectURL(event.target.files[i]));
      }
    }
    else if (event.target.name === 'originDocs') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.originDocs.push(URL.createObjectURL(event.target.files[i]));
      }
    }
    if (event.target.name === 'customDocs') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.customDocs.push(URL.createObjectURL(event.target.files[i]));
      }
    }
  }
  navigateDispatcher() {
    console.log(this.createTicketFormDispatcher.value);
    this.router.navigateByUrl('/tabs/home/trucking/commercial/create-ticket/ticket-generated');
  }
  navigateTruckDriver() {
    console.log(this.createTicketFormTruckDriver.value);
    this.router.navigateByUrl('/tabs/home/trucking/commercial');
  }
}
