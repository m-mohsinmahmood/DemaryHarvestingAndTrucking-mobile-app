/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { HarvestingService } from '../../harvesting.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TicketDetailPage } from './../../../trucking/commercial/verify-ticket/ticket-detail/ticket-detail.page';

@Component({
  selector: 'app-generated-ticket',
  templateUrl: './generated-ticket.page.html',
  styleUrls: ['./generated-ticket.page.scss'],
})
export class GeneratedTicketPage implements OnInit {
  // Profile variables
  customerData: any;
  ticketData: any;

  isLoadingCustomer: boolean;
  isLoadingTicket: boolean;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private harvestingService: HarvestingService,
    private router: Router

  ) { }

  ngOnInit() {
    this.initApis();
    this.initObservables();
    console.log('Ticket Id',this.router.getCurrentNavigation().extras.state.ticketId);

  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  initApis(){
    // this.harvestingService.getTickets();
    this.harvestingService.getJob2();
    this.harvestingService.getTicketById(this.router.getCurrentNavigation().extras.state.ticketId,'ticket');

  }
  initObservables(){
    this.harvestingService.customer$.subscribe((res)=>{
      this.customerData = res;
      console.log('res::',res);
    });

    this.harvestingService.ticket$.subscribe((res)=>{
      console.log('Ticket:',res);
      this.ticketData = res;
    });

    this.harvestingService.customerLoading2$.subscribe((val)=>{
      console.log('Customer Value',val);
      this.isLoadingCustomer = val;
    });


    this.harvestingService.ticketLoading$.subscribe((val)=>{
      console.log('Ticket Value',val);
      this.isLoadingTicket = val;
    });
  }

}
