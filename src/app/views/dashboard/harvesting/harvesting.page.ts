/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HarvestingService } from './harvesting.service';
import { takeLast } from 'rxjs/operators';
import { range, Observable } from 'rxjs';

@Component({
  selector: 'app-harvesting',
  templateUrl: './harvesting.page.html',
  styleUrls: ['./harvesting.page.scss'],
})
export class HarvestingPage implements OnInit {
  preCheckFilled;
  activeWorkOrders: Observable<any>;
  activeTicket;
  preCheck;
  dataCount = {
    active: -1,
    preCheck: -1
  };

  role: any;
  constructor(
    private location: Location,
    private router: Router,
    private harvestingService: HarvestingService
  ) { }

  ngOnInit() {
    // console.log('AAA',localStorage.getItem('role'));
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

  async ionViewDidEnter() {
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
// function interval(arg0: number) {
//   throw new Error('Function not implemented.');
// }

// function fromEvent(document: Document, arg1: string) {
//   throw new Error('Function not implemented.');
// }

// function takeUntil(clicks: any): any {
//   throw new Error('Function not implemented.');
// }

