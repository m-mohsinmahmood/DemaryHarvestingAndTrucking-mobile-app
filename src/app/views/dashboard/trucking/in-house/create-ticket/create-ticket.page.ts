import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {
  role = '';
  createTicketFormDispatcherInHouse: FormGroup;
  createTicketFormTruckDriverInHouse: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.initForms();
  }

  initForms() {
    this.createTicketFormDispatcherInHouse = this.formBuilder.group({
      ticketNo: ['', [Validators.required]],
      dispatcherName: ['', [Validators.required]],
      driverName: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      dispatcherNotes: ['', [Validators.required]],
    });
    this.createTicketFormTruckDriverInHouse = this.formBuilder.group({
      ticketNo: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      driverName: ['', [Validators.required]],
      loadDate: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      truckNo: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      destinationEndingnOdometerReading: ['', [Validators.required]],
      tripMiles: ['', [Validators.required]],
      deadHeadMiles: ['', [Validators.required]],
      totalJobMiles: ['', [Validators.required]],
      driverNotes: ['']
    });
  }
  navigateTo(navURL: string) {
    this.router.navigateByUrl(navURL);
  }
  navigatedispatcher() {
    console.log(this.createTicketFormDispatcherInHouse.value);
    this.router.navigateByUrl('/tabs/home/trucking/in-house');
  }
  navigateTruckDriver() {
    console.log(this.createTicketFormTruckDriverInHouse.value);
    this.router.navigateByUrl('/tabs/home/trucking/in-house');
  }
}
