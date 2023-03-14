/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { HarvestingService } from './../harvesting.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.page.html',
  styleUrls: ['./verify-ticket.page.scss'],
})
export class VerifyTicketPage implements OnInit {
  segment: any;
  role: any;
  // Data
  sentTicketData$;
  pendingTicketData$;
  verifiedTicketData$;

  // subscriptions
  sentTicketDataSub: Subscription;
  sentTicketLoadiingSub: Subscription;

  // Loaders
  sentTicketLoading$;
  pendingTicketLoading$;
  verifiedTicketLoading$;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private location: Location,
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
    // this.sentTicketData$.unsubscribe();
    // this.pendingTicketData$.unsubscribe();
    // this.verifiedTicketData$.unsubscribe();
    // this.sentTicketLoading$.unsubscribe();
    // this.pendingTicketLoading$.unsubscribe();
    // this.verifiedTicketLoading$.unsubscribe();
  }

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

  async ionViewDidEnter() {
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

  initSentApis() {
    if (this.role === 'kart-operator') {
      this.harvestingService.kartOperatorGetTickets(
        localStorage.getItem('employeeId'),
        'sent'
      );
    } else if (this.role === 'truck-driver') {
      this.harvestingService.truckDriverGetTickets(
        localStorage.getItem('employeeId'),
        'sent'
      );
    }
  }

  initSentObservables() {
    this.sentTicketData$ = this.harvestingService.sentTicket$;
    this.sentTicketLoading$ = this.harvestingService.sentTicketLoading$;
  }

  initPendingApis() {
    if (this.role === 'kart-operator') {
      this.harvestingService.kartOperatorGetTickets(
        localStorage.getItem('employeeId'),
        'pending'
      );
    } else if (this.role === 'truck-driver') {
      this.harvestingService.truckDriverGetTickets(
        localStorage.getItem('employeeId'),
        'pending'
      );
    }
  }

  initPendingObservables() {
    this.pendingTicketData$ = this.harvestingService.pendingTicket$;
    this.pendingTicketLoading$ = this.harvestingService.pendingTicketLoading$;
  }

  initVerifiedApis() {
    this.harvestingService.kartOperatorGetTickets(
      localStorage.getItem('employeeId'),
      'verified'
    );
  }

  initVerifiedObservables() {
    this.verifiedTicketData$ = this.harvestingService.verifiedTicket$;
    this.verifiedTicketLoading$ = this.harvestingService.verifiedTicketLoading$;
  }

  navigate(ticket) {
    let stringifyTicket = JSON.stringify(ticket);
    this.router.navigateByUrl(
      '/tabs/home/harvesting/verify-ticket/generated-ticket',
      {
        state: {
          ticket: stringifyTicket,
        },
      }
    );
  }

  reassignTicket(ticket) {
    this.router.navigateByUrl('/tabs/home/harvesting/ticket', {
      state: {
        ticketId: ticket,
        reassign: true,
      },
    });
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
      this.initPendingApis();
      this.initPendingObservables();
    }
  }
}
