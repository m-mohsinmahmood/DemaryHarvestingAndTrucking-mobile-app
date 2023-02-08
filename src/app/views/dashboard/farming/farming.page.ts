import { Component, OnInit, Output } from '@angular/core';
import { FarmingService } from './farming.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './farming.page.html',
  styleUrls: ['./farming.page.scss'],
})
export class FarmingPage implements OnInit {
  role = ""
  pendingWorkOrders: Observable<any>;
  pendingOrdersCount = -1;
  sentOrdersCount = -1;
  workOrderCount: any
  constructor(private farmingService: FarmingService) {

  }

  ngOnInit() {
    this.initDataRetrieval();
  }

  async ionViewDidEnter() {
    this.initDataRetrieval();
  }

  initDataRetrieval() {
    this.pendingOrdersCount = -1;
    this.sentOrdersCount = -1;

    this.role = localStorage.getItem('role');

    // To check if employee has begun a day before closing it
    if (this.role === 'dispatcher') {
      this.farmingService.getAllWorkOrders('', 'pending_work_order', localStorage.getItem('employeeId')).subscribe(workOrder => {
        this.pendingOrdersCount = workOrder.count;
      })
    }
    else {
      // console.log("Tractor Driver: ", localStorage.getItem('employeeId'));
      this.farmingService.getBeginningOfDay(localStorage.getItem('employeeId'), 'beginningOfDay', 'farming').subscribe(workOrder => {
        this.workOrderCount = workOrder.count;
        console.log("Active DWR :", workOrder);
      });

      this.farmingService.getAllWorkOrders('', 'existing_work_order', localStorage.getItem('employeeId')).subscribe(workOrder => {
        this.sentOrdersCount = workOrder.count;
        console.log("Existing Work Orders: ", workOrder);

      })
    }
  }
}
