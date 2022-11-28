import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {
  verifyFormInHouseTruck: FormGroup;
  role = '';

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.verifyFormInHouseTruck = this.formBuilder.group({
      ticketNo: ['', [Validators.required]],
      truckNo: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      originBeginingOdometerReading: ['', [Validators.required]],
      destinationEndingOdometerReading: ['', [Validators.required]],
      totalTripMiles: ['', [Validators.required]],
      deadHeadMiles: ['', [Validators.required]],
      totalJobMiles: ['', [Validators.required]],
      notes: [''],
    });
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }

  navigateTruck() {
    console.log(this.verifyFormInHouseTruck.value);
    this.router.navigateByUrl('/tabs/home/trucking/in-house');
  }

}
