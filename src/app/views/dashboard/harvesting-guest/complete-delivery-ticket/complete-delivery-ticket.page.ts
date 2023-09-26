import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { Subject } from 'rxjs';
import { HarvestingService } from '../../harvesting/harvesting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-delivery-ticket',
  templateUrl: './complete-delivery-ticket.page.html',
  styleUrls: ['./complete-delivery-ticket.page.scss'],
})
export class CompleteDeliveryTicketPage implements OnInit {

  segment: any;
  role: any;
  sentTicketData$;
  sentTicketLoading$;
  completedTicketData$;
  completedTicketLoading$;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private harvestingService: HarvestingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.segment = 'received';

    if (this.role.includes('Truck Driver')) {
      this.initSentApis();
      this.initSentObservables();
    }
  }

  async ionViewDidLeave() {
    this.DataDestroy();
  }

  async ionViewDidEnter() {
    this.role = localStorage.getItem('role');

    // passing the segment value conditionally
    this.segment = 'received';

    if (this.role.includes('Truck Driver')) {
      this.initSentApis();
      this.initSentObservables();
    }
  }

  ngOnDestroy(): void {
    this.DataDestroy();
  }

  DataDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  segmentChangeDetect(event) {
    if (event.target.value === 'received') {
      this.initSentApis();
      this.initSentObservables();
    }
    if (event.target.value === 'completed') {
      this.initCompletedApis();
      this.initCompletedObservables();
    }
  }

  initSentApis() {
    if (this.role.includes('Truck Driver')) {
      this.harvestingService.truckDriverGetTickets(
        localStorage.getItem('employeeId'),
        'sent',
        '',
        ''
      );
    }
  }

  initSentObservables() {
    this.sentTicketData$ = this.harvestingService.sentTicket$;
    this.sentTicketLoading$ = this.harvestingService.sentTicketLoading$;
  }

  initCompletedApis() {
    if (this.role.includes('Truck Driver')) {
      this.harvestingService.truckDriverGetTickets(
        localStorage.getItem('employeeId'),
        'verified',
        moment(moment().format('MM-DD-YYYY')).startOf('day').toISOString(),
        moment(moment().format('MM-DD-YYYY')).endOf('day').toISOString()
      );
    }
  }

  initCompletedObservables() {
    this.completedTicketData$ = this.harvestingService.completedTicket$;
    this.completedTicketLoading$ = this.harvestingService.completedTicketLoading$;
  }

  navigate(ticket) {
    const stringifyTicket = JSON.stringify(ticket);
    this.router.navigateByUrl(
      '/tabs/home/harvesting/verify-ticket/generated-ticket',
      {
        state: {
          ticket: stringifyTicket,
        },
      }
    );
  }

  segmentChangeTruck(event) {
    if (event.target.value === 'received') {
      this.initSentApis();
      this.initSentObservables();
    }
    if (event.target.value === 'completed') {
      this.initCompletedApis();
      this.initCompletedObservables();
    }
  }
}
