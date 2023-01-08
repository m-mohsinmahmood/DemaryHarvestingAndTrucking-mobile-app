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
      this.farmingService.getBeginningOfDay('1a4d594b-726c-46e4-b677-5e4a78adbc1e', 'beginningOfDay').subscribe(workOrder => {
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
