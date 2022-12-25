/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HarvestingService } from './../harvesting.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.page.html',
  styleUrls: ['./verify-ticket.page.scss'],
})
export class VerifyTicketPage implements OnInit {
  segment: any;
  role: any;
  // Data Observables
  sentTicketData$: Observable<any>;
  pendingTicketData$: Observable<any>;
  verifiedTicketData$: Observable<any>;

  // Loaders
  sentTicketLoading$: Observable<any>;
  pendingTicketLoading$: Observable<any>;
  verifiedTicketLoading$: Observable<any>;


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

    console.log('NG-DESTROY');
  }

  initSentApis() {
    this.harvestingService.getSentTicket('sent');
  }
  initSentObservables() {
    this.sentTicketData$ = this.harvestingService.sentTicket$;
    this.sentTicketLoading$ = this.harvestingService.sentTicketLoading$;
  }
  initPendingApis() {
    this.harvestingService.getPendingTicket('pending');
  }
  initPendingObservables() {
    this.pendingTicketData$ = this.harvestingService.pendingTicket$;
    this.pendingTicketLoading$ = this.harvestingService.pendingTicketLoading$;
  }
  initVerifiedApis() {
    this.harvestingService.getVerifiedTicket('verified');
  }
  initVerifiedObservables() {
    this.verifiedTicketData$ = this.harvestingService.verifiedTicket$;
    this.verifiedTicketLoading$ = this.harvestingService.verifiedTicketLoading$;
  }

  navigate(ticket) {
    this.router.navigateByUrl(
      '/tabs/home/harvesting/verify-ticket/generated-ticket',
      {
        state: {
          ticketId: ticket,
        },
      }
    );
  }
  reassignTicket(ticket) {
    this.router.navigateByUrl(
      '/tabs/home/harvesting/ticket',
      {
        state: {
          ticketId: ticket,
          reassign: true
        },
      }
    );
  }

  goBack() {
    this.location.back();
  }
  segmentChange(event) {
    if (event.target.value === 'pending') {
      this.initPendingApis();
      this.initPendingObservables();
    }
    if (event.target.value === 'sent') {
      this.initSentApis();
      this.initSentObservables();
    }
    if (event.target.value === 'verified') {
      this.initVerifiedApis();
      this.initVerifiedObservables();
    }
  }
  segmentChangeTruck(event) {
    if (event.target.value === 'received') {
      this.initSentApis();
      this.initSentObservables();
    }
    if (event.target.value === 'completed') {
      this.initVerifiedApis();
      this.initVerifiedObservables();
    }
  }
}
