import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TruckingService } from './../../trucking.service';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.page.html',
  styleUrls: ['./verify-ticket.page.scss'],
})
export class VerifyTicketPage implements OnInit {

  segment = 'pending'; // For Segment
  segmentTruckDriver = 'existing'; // For Segment

  role;

  sentWorkOrders: Observable<any>;
  pendingWorkOrders: Observable<any>;
  verifiedWorkOrders: Observable<any>;

  existingTickets: Observable<any>;
  completedTickets: Observable<any>;

  dataLoaded = {
    sentList: false,
    pendingList: false,
    verifiedList: false,
    existingList: false,
    completedList: false
  }

  dataCount = {
    sent: 0,
    pending: 0,
    verified: 0,
    existing: 0,
    completed: 0
  }

  constructor(private truckingService: TruckingService) { }

  ngOnInit() {
    this.initDataFetch();
  }

  async ionViewDidEnter() {
    this.initDataFetch();
  }

  initDataFetch() {
    this.role = localStorage.getItem('role');

    if (this.role.includes('Dispatcher')) {
      this.sentWorkOrders = this.truckingService.getDeliveryTickets(this.role, 'sent', localStorage.getItem('employeeId'), 'home');
      this.sentWorkOrders.subscribe((workOrders) => {
        this.dataLoaded.sentList = true;
        this.dataCount.sent = workOrders.count;
        console.log("Sent:", workOrders);
      });

      this.pendingWorkOrders = this.truckingService.getDeliveryTickets(this.role, 'pending', localStorage.getItem('employeeId'), 'home');
      this.pendingWorkOrders.subscribe((workOrders) => {
        this.dataLoaded.pendingList = true;
        this.dataCount.pending = workOrders.count;
        console.log("Pending: ", workOrders);
      });

      this.verifiedWorkOrders = this.truckingService.getDeliveryTickets(this.role, 'verified', localStorage.getItem('employeeId'), 'home');
      this.verifiedWorkOrders.subscribe((workOrders) => {
        this.dataLoaded.verifiedList = true;
        this.dataCount.verified = workOrders.count;
        console.log("Verified: ", workOrders);
      });
    }

    else {
      this.existingTickets = this.truckingService.getDeliveryTickets(this.role, 'sent', localStorage.getItem('employeeId'), 'home', false, false, false);
      this.existingTickets.subscribe((workOrders) => {
        this.dataLoaded.existingList = true;
        this.dataCount.existing = workOrders.count;
        console.log("Existing:", workOrders);
      });

      this.completedTickets = this.truckingService.getDeliveryTickets(this.role, 'pending', localStorage.getItem('employeeId'), 'home');
      this.completedTickets.subscribe((workOrders) => {
        this.dataLoaded.completedList = true;
        this.dataCount.completed = workOrders.count;
        console.log("Completed: ", workOrders);
      });
    }
  }
}
