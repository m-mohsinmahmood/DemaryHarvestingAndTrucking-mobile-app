import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TruckingService } from './../trucking.service';

@Component({
  selector: 'app-in-house',
  templateUrl: './in-house.page.html',
  styleUrls: ['./in-house.page.scss'],
})
export class InHousePage implements OnInit {

  pendingWorkOrders: Observable<any>;
  existingWorkOrders: Observable<any>;
  activeWorkOrders: Observable<any>;
  preCheckFilled: Observable<any>;
  activeTicket;
  preCheck;

  dataLoaded = {
    pendingList: false,
    existingList: false,
  }
  dataCount = {
    pending: -1,
    existing: -1,
    active: -1,
    preCheck: -1
  }

  role;

  constructor(private truckingService: TruckingService) { }

  ngOnInit() {
    this.initData();
  }

  async ionViewDidEnter() {
    this.initData();
  }

  initData() {
    this.dataLoaded = {
      pendingList: false,
      existingList: false,
    }

    this.dataCount = {
      pending: -1,
      existing: -1,
      active: -1,
      preCheck: -1
    }

    this.role = localStorage.getItem('role');
    console.log(localStorage.getItem('role'));
    console.log(localStorage.getItem('employeeId'));


    if (this.role.includes('Dispatcher')) {
      // If Dispatcher Logs In
      this.pendingWorkOrders = this.truckingService.getDeliveryTickets(this.role, 'pending', localStorage.getItem('employeeId'), 'home');
      this.pendingWorkOrders.subscribe((workOrders) => {
        this.dataLoaded.pendingList = true;
        this.dataCount.pending = workOrders.count;
        console.log("Pending: ", workOrders);
      });
    }
    else {
      // If Truck Driver Logs In
      this.existingWorkOrders = this.truckingService.getDeliveryTickets(this.role, 'sent', localStorage.getItem('employeeId'), 'home', false, false, false);
      this.existingWorkOrders.subscribe((workOrders) => {
        this.dataLoaded.existingList = true;
        this.dataCount.existing = workOrders.count;
        console.log("Existing: ", workOrders);
      });

      this.activeWorkOrders = this.truckingService.getDeliveryTickets(this.role, 'sent', localStorage.getItem('employeeId'), 'home', true, true, false);
      this.activeWorkOrders.subscribe((workOrders) => {
        this.activeTicket = workOrders.workOrders[0];
        if (this.activeTicket !== undefined && !this.activeTicket.hasOwnProperty('preRoute')) {
          this.activeTicket.preRoute = '/tabs/home/trucking/in-house';
          this.activeTicket.module = 'trucking';
        }

        this.dataCount.active = workOrders.count;
        console.log("Active: ", workOrders);
      });

      this.preCheckFilled = this.truckingService.getDeliveryTickets(this.role, 'sent', localStorage.getItem('employeeId'), 'home', true, true, true);
      this.preCheckFilled.subscribe((workOrders) => {
        this.preCheck = workOrders.workOrders[0];
        this.dataCount.preCheck = workOrders.count;
        console.log("Pre Check Filled: ", workOrders);
      });
    }
  }

}
