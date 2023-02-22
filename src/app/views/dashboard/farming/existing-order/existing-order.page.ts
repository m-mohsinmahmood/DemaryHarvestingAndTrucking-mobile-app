import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FarmingService } from './../farming.service';

@Component({
  selector: 'app-existing-order',
  templateUrl: './existing-order.page.html',
  styleUrls: ['./existing-order.page.scss'],
})
export class ExistingOrderPage implements OnInit {

  segment = 'existing'; // For Segment
  completedWorkOrders: Observable<any>;
  existingWorkOrders: Observable<any>;

  completeOrdersCount = 0;
  existingOrdersCount = 0;

  dataLoaded = {
    completedList: false,
    existingList: false
  }


  constructor(
    private farmingService: FarmingService
  ) { }

  ngOnInit() {
    this.initDataRetrieval();
  }

  async ionViewDidEnter() {
    this.initDataRetrieval();
  }

  initDataRetrieval() {
    this.segment = 'existing'; // For Segment
    this.completeOrdersCount = 0;
    this.existingOrdersCount = 0;

    this.dataLoaded = {
      completedList: false,
      existingList: false
    }

    this.completedWorkOrders = this.farmingService.getAllWorkOrders('', 'completed_work_order', localStorage.getItem('employeeId'));

    this.completedWorkOrders.subscribe((customers) => {
      this.completeOrdersCount = customers.workOrders.length;
      this.dataLoaded.completedList = true;
      console.log(customers);
    });

    this.existingWorkOrders = this.farmingService.getAllWorkOrders('', 'existing_work_order', localStorage.getItem('employeeId'));

    this.existingWorkOrders.subscribe((customers) => {
      this.existingOrdersCount = customers.workOrders.length;
      this.dataLoaded.existingList = true;
      console.log(customers);
    });
  }

}
