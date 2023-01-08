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

  dataLoaded = {
    pendingList: false,
    existingList: false,
  }
  dataCount = {
    pending: -1,
    existing: -1,
  }

  roleOptions = ['dispatcher', 'truck-driver'];
  role = this.roleOptions[0];

  constructor(private truckingService: TruckingService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    console.log(localStorage.getItem('role'));
    console.log(localStorage.getItem('employeeId'));


    if (this.role === 'dispatcher') {
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
      this.existingWorkOrders = this.truckingService.getDeliveryTickets(this.role, 'sent', localStorage.getItem('employeeId'), 'home');
      this.existingWorkOrders.subscribe((workOrders) => {
        this.dataLoaded.existingList = true;
        this.dataCount.existing = workOrders.count;
        console.log("Existing: ", workOrders);
      });
    }
  }

}
