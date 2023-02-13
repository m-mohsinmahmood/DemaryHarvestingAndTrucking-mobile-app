/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { HarvestingService } from '../../harvesting.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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
  jobSub;
  ticketSub;
  loadingSub;
  ticketLoading;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private harvestingService: HarvestingService,
    private router: Router

  ) { }

  ngOnDestroy(): void {
    this.DataDestroy();
  }

  async ionViewDidLeave() {
    this.DataDestroy();
  }

  DataDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.jobSub.unsubscribe();
    this.ticketSub.unsubscribe();
    this.loadingSub.unsubscribe();
    this.ticketLoading.unsubscribe();
  }

  ngOnInit() {
    this.initApis();
    this.initObservables();
    console.log('Ticket Id', this.router.getCurrentNavigation().extras.state.ticketId);

  }

  initApis() {
    this.harvestingService.getJob2();
    this.harvestingService.getTicketById(this.router.getCurrentNavigation().extras.state.ticketId, 'ticket');

  }
  initObservables() {
    this.jobSub = this.harvestingService.getjob2$.subscribe((res) => {
      this.customerData = res;
      console.log('res::', res);
    });

    this.ticketSub = this.harvestingService.ticket$.subscribe((res) => {
      console.log('Ticket:', res);
      this.ticketData = res;
    });

    this.loadingSub = this.harvestingService.customerLoading2$.subscribe((val) => {
      console.log('Customer Value', val);
      this.isLoadingCustomer = val;
    });


    this.ticketLoading = this.harvestingService.ticketLoading$.subscribe((val) => {
      console.log('Ticket Value', val);
      this.isLoadingTicket = val;
    });
  }

}
