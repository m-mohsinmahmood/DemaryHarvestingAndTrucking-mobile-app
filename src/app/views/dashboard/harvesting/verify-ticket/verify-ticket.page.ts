/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { HarvestingService } from './../harvesting.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.page.html',
  styleUrls: ['./verify-ticket.page.scss'],
})
export class VerifyTicketPage implements OnInit {
  @ViewChild('driverInput') driverInput: ElementRef;

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

  isReassignModalOpen = false;
  driverSetupForm: FormGroup;

  truck_driver_search$ = new Subject();
  isTruckDriverSelected: any = true;
  add_location_overlay = true;
  driver_name: any = '';
  allDriversDropdown: Observable<any>;
  driverSearchValue: any = '';
  driverUL: any = false;
  allTruckDrivers: Observable<any>;
  deleteId;



  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private location: Location,
    private harvestingService: HarvestingService,
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,

  ) {
    // this.renderer.listen('window', 'click', (e) => {
    //   if (e.target !== this.driverInput.nativeElement) {
    //     this.driverUL = false;
    //   }
    // });
  }

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
    this.segment = this.role.includes('Cart Operator') ? 'sent' : 'received';
    if (this.role.includes('Cart Operator')) {
      this.initSentApis();
      this.initSentObservables();
    }
    if (this.role.includes('Truck Driver')) {
      this.initSentApis();
      this.initSentObservables();
    }

    this.driverSetupForm = this.formBuilder.group({
      truck_driver: ['', [Validators.required]],
      jobId:['']
    });

    this.driverSearchSubscription();
  }

  async ionViewDidEnter() {
    this.role = localStorage.getItem('role');

    // passing the segment value conditionally
    this.segment = this.role.includes('Cart Operator') ? 'sent' : 'received';
    if (this.role.includes('Cart Operator')) {
      this.initSentApis();
      this.initSentObservables();
    }
    if (this.role.includes('Truck Driver')) {
      this.initSentApis();
      this.initSentObservables();
    }
  }

  async ionModalDidDismiss() {
    this.isReassignModalOpen = false;

    this.isTruckDriverSelected = true; // for asterik
    this.driverInput.nativeElement.value = '';

  // @ViewChild('driverInput') driverInput: ElementRef;
  // this.driverInput.nativeElement.value = '';

  }
  initSentApis() {
    if (this.role.includes('Cart Operator')) {
      this.harvestingService.kartOperatorGetTickets(
        localStorage.getItem('employeeId'),
        'sent'
      );
    } else if (this.role.includes('Truck Driver')) {
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
    if (this.role.includes('Cart Operator')) {
      this.harvestingService.kartOperatorGetTickets(
        localStorage.getItem('employeeId'),
        'pending'
      );
    } else if (this.role.includes('Truck Driver')) {
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
  openModal(jobId){
    this.isReassignModalOpen = true;
    this.driverSetupForm.patchValue({jobId});
  }
  reassignDriver(){
    console.log(this.driverSetupForm.value);
  }

  //#region truck driver dropdown
  driverSearchSubscription() {
    this.truck_driver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.driverSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isTruckDriverSelected = true;
        }

        // calling API
        this.allTruckDrivers =
          this.harvestingService.getCombineCartOperator(
            this.driverSearchValue,
            'getCombineCartOperator',
            'Truck Driver'
          );

        // subscribing to show/hide field UL
        this.allTruckDrivers.subscribe((truckDrivers) => {

          if (truckDrivers.length === 0) {
            // hiding UL
            this.driverUL = false;
          } else {
            this.driverUL = true;
          }
        });
      });
  }
  clickedTruckDriverInput() {
    this.truck_driver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((val) => {
        this.driverSearchValue = val;
      });

    const value =
      this.driverSearchValue === undefined
        ? this.driver_name
        : this.driverSearchValue;

    // calling API
    this.allTruckDrivers =
      this.harvestingService.getCombineCartOperator(
        this.driverSearchValue,
        'getCombineCartOperator',
        'Truck Driver'
      );

    this.allTruckDrivers.subscribe((driver) => {
      console.log('--', driver);
      if (driver.length === 0) {
        this.driverUL = false;
      } else {
        this.driverUL = true;
      }
    });
  }
  selectedDriver(driver) {
    console.log(driver);

    this.driverUL = false;
    this.driverInput.nativeElement.value = driver.first_name + ' ' + driver.last_name;
    this.isTruckDriverSelected = false;
    this.driverSetupForm.controls.truck_driver.setValue(driver.id ?? '');
  }
  //#endregion

}
