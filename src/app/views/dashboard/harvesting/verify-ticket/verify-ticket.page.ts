/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HarvestingService } from './../harvesting.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.page.html',
  styleUrls: ['./verify-ticket.page.scss'],
})
export class VerifyTicketPage implements OnInit {
  segment: any;
  role: any;
 // Data
  ticketData: any;
  sentTicketData: any;
  pendingTicketData: any;
  verifiedTicketData: any;

  // Loaders
  isLoadingTicket: boolean;
  sentTicketLoading: boolean;
  pendingTicketLoading: boolean;
  verifiedTicketLoading: boolean;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private harvestingService: HarvestingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // passing the segment value conditionally
    this.segment = this.role === 'kart-operator' ? 'sent' : 'received';
    if (this.role === 'kart-operator') {
      // this.initApis();
      // this.initObservables();
      this.initSentApis();
      this.initSentObservables();
    }
    if (this.role === 'truck-driver') {
      this.initSentApis();
      this.initSentObservables();
    }
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  initApis() {
    this.harvestingService.getTickets();
  }
  initObservables() {
    this.harvestingService.tickets$.subscribe((res) => {
      console.log('Tickets:', res);
      this.ticketData = res;
    });

    this.harvestingService.ticketsLoading$.subscribe((val) => {
      console.log('Ticket Value', val);
      this.isLoadingTicket = val;
    });
  }
  initSentApis() {
    this.harvestingService.getSentTicket('sent');
  }
  initSentObservables() {
    this.harvestingService.sentTicket$.subscribe((res) => {
      this.sentTicketData = res;
    });

    this.harvestingService.sentTicketLoading$.subscribe((val) => {
      console.log('Sent Loading Value', val);
      this.sentTicketLoading = val;
    });
  }
  initPendingApis() {
    this.harvestingService.getPendingTicket('pending');
  }
  initPendingObservables() {
    this.harvestingService.pendingTicket$
    // .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
      this.pendingTicketData = res;
    });

    this.harvestingService.pendingTicketLoading$
    // .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((val) => {
      console.log('Pending Loading Value',val);
      this.pendingTicketLoading = val;
    });
  }
  initVerifiedApis() {
    this.harvestingService.getVerifiedTicket('verified');
  }
  initVerifiedObservables() {
    this.harvestingService.verifiedTicket$
    .subscribe((res) => {
      console.log('---',res);
      this.verifiedTicketData = res;
    });

    this.harvestingService.verifiedTicketLoading$
    .subscribe((val) => {
      console.log('Verified Loading Value',val);
      this.verifiedTicketLoading = val;
    });
  }

  navigate(ticket){
    this.router.navigateByUrl('/tabs/home/harvesting/verify-ticket/generated-ticket',{
      state:{
        ticketId: ticket
      }
    });
  }

  goBack() {
    this.location.back();
  }
  segmentChange(event){
    console.log('--',event.target.value);
    if(event.target.value === 'pending'){
      this.initPendingApis();
      this.initPendingObservables();
    }
    if(event.target.value === 'sent'){
      this.initSentApis();
      this.initSentObservables();
    }
    if(event.target.value === 'verified'){
      this.initVerifiedApis();
      this.initVerifiedObservables();
    }
  }
  segmentChangeTruck(event){
    console.log('-',event.target.value);
    if(event.target.value === 'received'){
      this.initSentApis();
      this.initSentObservables();
    }
    if(event.target.value === 'completed'){
      this.initVerifiedApis();
      this.initVerifiedObservables();
    }

  }
}
