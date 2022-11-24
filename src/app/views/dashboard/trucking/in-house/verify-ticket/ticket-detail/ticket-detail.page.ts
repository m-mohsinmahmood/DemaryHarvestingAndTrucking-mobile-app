import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {
  verifyFormInHouseDispatcher: FormGroup;
  verifyFormInHouseTruck: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  roleOptions = ['dispatcher', 'truck-driver']
  role = this.roleOptions[1];

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.verifyFormInHouseDispatcher = this.formBuilder.group({
      ticketNo: ['',[Validators.required]],
      truckNo: ['',[Validators.required]],
      homeBeginingOdometerReading: ['',[Validators.required]],
      originBeginingOdometerReading: ['',[Validators.required]],
      destinationEndingOdometerReading: ['',[Validators.required]],
      totalTripMiles: ['',[Validators.required]],
      deadHeadMiles: ['',[Validators.required]],
      totalJobMiles: ['',[Validators.required]],
    });

    this.verifyFormInHouseTruck = this.formBuilder.group({
      ticketNo: ['',[Validators.required]],
      truckNo: ['',[Validators.required]],
      homeBeginingOdometerReading: ['',[Validators.required]],
      originBeginingOdometerReading: ['',[Validators.required]],
      destinationEndingOdometerReading: ['',[Validators.required]],
      totalTripMiles: ['',[Validators.required]],
      deadHeadMiles: ['',[Validators.required]],
      totalJobMiles: ['',[Validators.required]],
    });
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }
  navigateDispatcher(){
    console.log(this.verifyFormInHouseDispatcher.value);
    this.router.navigateByUrl('/tabs/home/trucking/in-house');
  }
  navigateTruck(){
    console.log(this.verifyFormInHouseTruck.value);
    this.router.navigateByUrl('/tabs/home/trucking/in-house');
  }

}
