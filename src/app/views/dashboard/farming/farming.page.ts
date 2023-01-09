import { Component, OnInit } from '@angular/core';
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
  workOrderCount: any;

  constructor(private farmingService: FarmingService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // To check if employee has begun a day before closing it

    if (this.role === 'dispatcher') {
      this.farmingService.getAllWorkOrders('', 'pending_work_order').subscribe(workOrder => {
        this.pendingOrdersCount = workOrder.count;
      })
    }
    else {
      console.log("Tractor Driver: ", localStorage.getItem('employeeId'));
      this.farmingService.getBeginningOfDay(localStorage.getItem('employeeId'), 'beginningOfDay').subscribe(workOrder => {
        this.workOrderCount = workOrder.count;
        console.log(workOrder);
      });

      this.farmingService.getAllWorkOrders('', 'sent_work_order').subscribe(workOrder => {
        this.sentOrdersCount = workOrder.count;
        console.log(this.sentOrdersCount);

      })
    }
  }
}
