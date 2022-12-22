/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HarvestingService } from './../harvesting.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.page.html',
  styleUrls: ['./verify-ticket.page.scss'],
})
export class VerifyTicketPage implements OnInit {
  segment: any;
  role: any;

  ticketData: any;
  sentTicketData: any;

  isLoadingTicket: boolean;
  sentTicketLoading: boolean;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private harvestingService: HarvestingService
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // passing the segment value conditionally
    this.segment = this.role === 'kart-operator'? 'sent' : 'received';
if(this.role === 'kart-operator'){
  this.initApis();
  this.initObservables();
}
    if(this.role === 'truck-driver'){
      this.initSentApis();
      this.initSentObservables();
    }
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  initApis(){
    this.harvestingService.getTickets();
  }
  initObservables(){
    this.harvestingService.tickets$.subscribe((res)=>{
      console.log('Tickets:',res);
      this.ticketData = res;
    });

    this.harvestingService.ticketsLoading$.subscribe((val)=>{
      console.log('Ticket Value',val);
      this.isLoadingTicket = val;
    });
  }
  initSentApis(){
    this.harvestingService.getSentTicket('sent');
  }
  initSentObservables(){
    this.harvestingService.sentTicket$.subscribe((res)=>{
      this.sentTicketData = res;
    });

    this.harvestingService.sentTicketLoading$.subscribe((val)=>{
      console.log('ddd',val);
      this.sentTicketLoading = val;
    });
  }

  goBack(){
    this.location.back();
  }
}
