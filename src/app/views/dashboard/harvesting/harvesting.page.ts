/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HarvestingService } from './harvesting.service';
import { Observable } from 'rxjs';
import { CheckInOutService } from './../../../components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-harvesting',
  templateUrl: './harvesting.page.html',
  styleUrls: ['./harvesting.page.scss'],
})
export class HarvestingPage implements OnInit {
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

  role: any;
  workOrderCount;
  constructor(
    private location: Location,
    private router: Router,
    private harvestingService: HarvestingService,
    private dwrServices: CheckInOutService
  ) { }

  ngOnInit() {
    // console.log('AAA',localStorage.getItem('role'));
    this.role = localStorage.getItem('role');

    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      console.log('Active Check In ', workOrder.dwr);
      this.activeDwr = workOrder.dwr;

      if (workOrder.dwr.length > 0)
        {this.isModalOpen = false;}
      else
        {this.isModalOpen = true;}
    });

    //call for dwr
    this.getDWRCount();

    if (this.role === 'truck-driver') {
      this.activeWorkOrders = this.harvestingService.getDeliveryTickets(this.role, localStorage.getItem('employeeId'), true, false, 'truck-driver-active-tickets');
      this.activeWorkOrders.subscribe((workOrders) => {
        this.activeTicket = workOrders.customer_job[0];
        if (this.activeTicket !== undefined && !this.activeTicket.hasOwnProperty('preRoute')) {
          this.activeTicket.preRoute = '/tabs/home/harvesting';
          this.activeTicket.module = 'harvesting';
        }

        console.log('Active: ', workOrders);
      });

      this.preCheckFilled = this.harvestingService.getDeliveryTickets(this.role, localStorage.getItem('employeeId'), true, true, 'truck-driver-active-tickets');
      this.preCheckFilled.subscribe((workOrders) => {
        this.preCheck = workOrders.customer_job[0];
        console.log('Pre Check Filled: ', workOrders);
      });
    }

  }

  async ionViewDidEnter() {

    //call for dwr
    this.getDWRCount();

    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      console.log('Active Check In ', workOrder.dwr);
      this.activeDwr = workOrder.dwr;

      if (workOrder.dwr.length > 0)
        {this.isModalOpen = false;}
      else
        {this.isModalOpen = true;}
    });

    this.role = localStorage.getItem('role');
    if (this.role === 'truck-driver') {
      this.activeWorkOrders = this.harvestingService.getDeliveryTickets(this.role, localStorage.getItem('employeeId'), true, false, 'truck-driver-active-tickets');
      this.activeWorkOrders.subscribe((workOrders) => {
        this.activeTicket = workOrders.customer_job[0];
        if (this.activeTicket !== undefined && !this.activeTicket.hasOwnProperty('preRoute')) {
          this.activeTicket.preRoute = '/tabs/home/harvesting';
          this.activeTicket.module = 'harvesting';
        }

        console.log('Active: ', workOrders);
      });

      this.preCheckFilled = this.harvestingService.getDeliveryTickets(this.role, localStorage.getItem('employeeId'), true, true, 'truck-driver-active-tickets');
      this.preCheckFilled.subscribe((workOrders) => {
        this.preCheck = workOrders.customer_job[0];
        console.log('Pre Check Filled: ', workOrders);
      });
    }

  }
getDWRCount(){
  this.harvestingService.getBeginningOfDay2(localStorage.getItem('employeeId'), 'beginningOfDay', 'harvesting')
     .subscribe((workOrder)=>{
      this.workOrderCount = workOrder.count;
      console.log('WorkOrder :', workOrder);
    });
}
  goBack() {
    this.location.back();
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
