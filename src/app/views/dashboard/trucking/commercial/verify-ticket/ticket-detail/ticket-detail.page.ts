import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {
  roleOptions = ['dispatcher', 'truck-driver'];
  role = this.roleOptions[1];
  createFormTruckCommercial: FormGroup;

  options: any;
  rateSheetImg: string[] = [];
  originDocs: string[] = [];
  customDocs: string[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.createFormTruckCommercial = this.formBuilder.group({
      truck: ['', [Validators.required]],
      ticket: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      originBeginingOdometerReading: ['', [Validators.required]],
      originEmptyWeight: ['', [Validators.required]],
      originLoadedWeight: ['', [Validators.required]],
      originWeightLoad: ['', [Validators.required]],
      destinationEndingnOdometerReading: ['', [Validators.required]],
      destinationLoadedWeight: ['', [Validators.required]],
      destinationEmptyWeight: ['', [Validators.required]],
      weightLoad: ['', [Validators.required]],
      scaleTicket: ['', [Validators.required]],
      destinationDeliveryLoad: ['', [Validators.required]],
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
  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }
  submit() {
    console.log(this.createFormTruckCommercial.value);
    this.router.navigateByUrl('/tabs/home/trucking/commercial');
  }



}
