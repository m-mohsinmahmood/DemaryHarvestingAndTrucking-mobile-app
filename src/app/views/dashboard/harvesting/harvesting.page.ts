/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HarvestingService } from './harvesting.service';
import { Observable } from 'rxjs';
import { CheckInOutService } from './../../../components/check-in-out/check-in-out.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-harvesting',
  templateUrl: './harvesting.page.html',
  styleUrls: ['./harvesting.page.scss'],
})
export class HarvestingPage implements OnInit {
  pendingTicketData$;
  pendingTicketLoading$;
  isModalOpen;
  activeDwr: any;
  preCheckFilled;
  activeWorkOrders: Observable<any>;
  activeTicket;
  preCheck;
  dataCount = {
    active: -1,
    preCheck: -1
  };

  role = '';
  workOrderCount;

  private initDataRetrievalExecuted = false;
  private ionViewRetrievalExecuted = true;

  constructor(
    private router: Router,
    private harvestingService: HarvestingService,
    private dwrServices: CheckInOutService
  ) { }

  ngOnInit() {
    if (!this.initDataRetrievalExecuted) {
      this.initDataRetrieval();
      this.initDataRetrievalExecuted = true;
      console.log("On Init");
    }
  }

  async ionViewDidEnter() {
    if (!this.ionViewRetrievalExecuted) {
      this.initDataRetrieval();
      this.ionViewRetrievalExecuted = true;
      console.log("Ion view did enter");
    }
  }

  async ionViewDidLeave() {
    this.ionViewRetrievalExecuted = false;
  }

  initDataRetrieval() {
    this.activeDwr = null;
    this.isModalOpen = false;
    this.dataCount = {
      active: -1,
      preCheck: -1
    }

    this.role = localStorage.getItem('role');

    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      console.log('Active Check In ', workOrder.dwr);
      this.activeDwr = workOrder.dwr;

      if (workOrder.dwr.length > 0) { this.isModalOpen = false; }
      else { this.isModalOpen = true; }
    });

    if (this.role.includes('Crew Chief')) {
      //call for dwr
      this.harvestingService.getBeginningOfDay2(localStorage.getItem('employeeId'), 'beginningOfDay', 'harvesting')
        .subscribe((workOrder) => {
          this.activeTicket = workOrder;
          this.workOrderCount = workOrder.count;
          console.log('Current DWR :', workOrder);
        });
    }

    if (this.role.includes('Combine Operator')) {
      this.harvestingService.getBeginningOfDay2(localStorage.getItem('employeeId'), 'beginningOfDay', 'harvesting')
        .subscribe((workOrder) => {
          this.activeTicket = workOrder;
          this.workOrderCount = workOrder.count;
          console.log('Current DWR :', workOrder);
        });
    }

    if (this.role.includes('Cart Operator')) {
      // Call to get pending tickets
      this.harvestingService.kartOperatorGetTickets(
        localStorage.getItem('employeeId'),
        'pending'
      );

      this.pendingTicketData$ = this.harvestingService.pendingTicket$;
      this.pendingTicketLoading$ = this.harvestingService.pendingTicketLoading$;

      //call for dwr
      this.harvestingService.getBeginningOfDay2(localStorage.getItem('employeeId'), 'beginningOfDay', 'harvesting')
        .subscribe((workOrder) => {
          this.activeTicket = workOrder;
          this.workOrderCount = workOrder.count;
          console.log('Current DWR of Cart Operator :', workOrder);
        });
    }

    if (this.role.includes('Truck Driver')) {
      this.activeWorkOrders = this.harvestingService.getDeliveryTickets(this.role, localStorage.getItem('employeeId'), true, false, 'truck-driver-active-tickets');
      this.activeWorkOrders.subscribe((workOrders) => {
        this.activeTicket = workOrders.customer_job[0];
        if (this.activeTicket !== undefined && !this.activeTicket.hasOwnProperty('preRoute')) {
          this.activeTicket.preRoute = '/tabs/home/harvesting';
          this.activeTicket.module = 'harvesting';
        }

        this.dataCount.active = workOrders.customer_job.length

        console.log('Active: ', workOrders);
        console.log('Active 2: ', this.dataCount.active);

      });

      this.preCheckFilled = this.harvestingService.getDeliveryTickets(this.role, localStorage.getItem('employeeId'), true, true, 'truck-driver-active-tickets');
      this.preCheckFilled.subscribe((workOrders) => {
        this.preCheck = workOrders.customer_job[0];
        this.dataCount.preCheck = workOrders.customer_job.length
        console.log('Pre Check Filled: ', workOrders);
      });
    }
  }

  navigate(route) {
    if (route === 'ticket') {
      this.router.navigateByUrl('tabs/home/harvesting/ticket', {
        state: {
          reassign: false
        }
      });
    } else {
      this.router.navigateByUrl('tabs/home/harvesting/ticket', {
        state: {
          reassign: true
        }
      });
    }
  }
}
