import { Component, OnInit } from '@angular/core';
import { FarmingService } from './farming.service';
import { Observable } from 'rxjs';
import { CheckInOutService } from './../../../components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './farming.page.html',
  styleUrls: ['./farming.page.scss'],
})
export class FarmingPage implements OnInit {

  role = '';
  pendingWorkOrders: Observable<any>;
  pendingOrdersCount = -1;
  sentOrdersCount = -1;
  workOrderCount: any;
  activeDwr: Observable<any>;
  data;
  isModalOpen;

  constructor(private dwrServices: CheckInOutService, private farmingService: FarmingService) {

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
    this.isModalOpen = false;

    // Check-in/Check-out
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      console.log('Active Check In ', workOrder.dwr);
      this.activeDwr = workOrder.dwr;
      this.data = this.activeDwr[0];

      if (workOrder.dwr.length > 0) { this.isModalOpen = false; }
      else { this.isModalOpen = true; }
    });

    // To check if employee has begun a day before closing it
    if (this.role.includes('Dispatcher')) {
      this.farmingService.getAllWorkOrders('', 'pending_work_order', localStorage.getItem('employeeId')).subscribe(workOrder => {
        this.pendingOrdersCount = workOrder.count;

      });
    }
    else {
      // console.log("Tractor Driver: ", localStorage.getItem('employeeId'));
      this.farmingService.getBeginningOfDay(localStorage.getItem('employeeId'), 'beginningOfDay', 'farming').subscribe(workOrder => {
        this.workOrderCount = workOrder.count;
        console.log('Active DWR :', workOrder);

      });

      this.farmingService.getAllWorkOrders('', 'existing_work_order', localStorage.getItem('employeeId')).subscribe(workOrder => {
        this.sentOrdersCount = workOrder.count;
        console.log('Existing Work Orders: ', workOrder);


      });
    }
  }
}
