import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FarmingService } from './../farming.service';

@Component({
  selector: 'app-verify-orders',
  templateUrl: './verify-orders.page.html',
  styleUrls: ['./verify-orders.page.scss'],
})
export class VerifyOrdersPage implements OnInit {
  segment = 'pending'; // For Segment

  sentWorkOrders: Observable<any>;
  pendingWorkOrders: Observable<any>;
  verifiedWorkOrders: Observable<any>;

  sentCount = 0;
  pendingCount = 0;
  verifiedCount = 0;

  dataLoaded = {
    sentList: false,
    pendingList: false,
    verifiedList: false
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
    this.sentCount = 0;
    this.pendingCount = 0;
    this.verifiedCount = 0;

    this.dataLoaded = {
      sentList: false,
      pendingList: false,
      verifiedList: false
    }

    this.sentWorkOrders = this.farmingService.getAllWorkOrders('', 'sent_work_order', localStorage.getItem('employeeId'));
    this.pendingWorkOrders = this.farmingService.getAllWorkOrders('', 'pending_work_order', localStorage.getItem('employeeId'));
    this.verifiedWorkOrders = this.farmingService.getAllWorkOrders('', 'verified_work_order', localStorage.getItem('employeeId'));

    this.sentWorkOrders.subscribe((workOrders) => {

      this.sentCount = workOrders.workOrders.length;
      this.dataLoaded.sentList = true;
      console.log("Sent: ", workOrders);
    });

    this.pendingWorkOrders.subscribe((workOrders) => {
      this.pendingCount = workOrders.workOrders.length;
      this.dataLoaded.pendingList = true;
      console.log("Pending: ", workOrders);
    });

    this.verifiedWorkOrders.subscribe((workOrders) => {
      this.verifiedCount = workOrders.workOrders.length;
      this.dataLoaded.verifiedList = true;
      console.log("Verified: ", workOrders);
    });
  }

}
