/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  role: any;
  isReassign: boolean;
  // isSplitTrue = false;
  isSplitTrue;
  deliveryTicketForm: FormGroup;

  // observables
  allTruckDrivers: Observable<any>;

  // subjects
  trick_driver_search$ = new Subject();

  // input values
  trick_driver_name: any = '';

  // input's search values
  truckDriverSearchValue: any;

  // to show UL's
  truckDriverUL: any = false;

  // for invalid
  isTruckDriverSelected: any = true;

  // Profile variables
  customerData: any;
  isLoading: any;


  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private router: Router,
    private formbuildr: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.isReassign = this.router.getCurrentNavigation().extras.state.reassign;

    this.deliveryTicketForm = this.formbuildr.group({
      truck_id: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      loaded_miles: ['', [Validators.required]],
      field: ['', [Validators.required]],
      split_load_check: [false, [Validators.required]],
      kart_scale_weight: ['', [Validators.required]],
      delivery_ticket_number: ['', [Validators.required]],
      kart_operator: ['', [Validators.required]],
      truck_driver_company: ['', [Validators.required]],
      truck: ['', [Validators.required]],
      split_load: ['', [Validators.required]],
      kart_scale_weight_split: ['', [Validators.required]],
      field_load_split: ['', [Validators.required]],
      status: ['sent'],
      working_status: ['pending']
      // kartScaleWeightOptionalSplit: ['',[Validators.required]],
      // deliveryTicketNumberSplit: ['',[Validators.required]],
      // kartoperatorNameSplit: ['',[Validators.required]],
      // truckDriverCompanySplit: ['',[Validators.required]],
      // truckSplit: ['',[Validators.required]],
    });

    this.truckDriverSearchSubscription();
    this.initApis();
  this.initObservables();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  initApis(){
    this.harvestingService.getJob();
  }
  initObservables(){
    this.harvestingService.customer$.subscribe((res)=>{
      this.customerData = res;
      console.log('res::',res);
    });
    this.harvestingService.customerLoading$.subscribe((val)=>{
      this.isLoading = val;
    });
  }
  goBack() {
    this.location.back();
  }
  buttton() {
    this.isSplitTrue = !this.isSplitTrue;
  }
  submit() {
    console.log(this.deliveryTicketForm.value);
    // this.router.navigateByUrl('/tabs/home/harvesting/ticket/generated-ticket',{
    //   state:{
    //     ticketId: 555
    //   }
    // });

    this.harvestingService
      .createTicket(this.deliveryTicketForm.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            // this.deliveryTicketForm.reset();
            this.trick_driver_name = '';
            this.toastService.presentToast(res.message, 'success');

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting/ticket/generated-ticket',{
              state:{
                ticketId: this.deliveryTicketForm.get('delivery_ticket_number').value
              }
            });

            console.log(res.message);
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
        }
      );
  }
//#region Truck Driver
truckDriverSearchSubscription() {

  this.trick_driver_search$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this._unsubscribeAll)
    )
    .subscribe((value: string) => {
      // passing for renderer2
      this.truckDriverSearchValue = value;

      // for asterik to look required
      if(value === ''){ this.isTruckDriverSelected = true;}

     // calling API
  this.allTruckDrivers = this.harvestingService.getEmployees(this.truckDriverSearchValue,'allEmployees','Truck Driver');

        // subscribing to show/hide field UL
        this.allTruckDrivers.subscribe((truckDrivers) => {
          console.log('Truck Drivers:',truckDrivers);

        if (truckDrivers.count === 0) {
          // hiding UL
          this.truckDriverUL = false;
        } else {
          this.truckDriverUL = true;
        }
      });
    });
}
inputClickedTruckDriver() {
  // getting the serch value to check if there's a value in input
  this.trick_driver_search$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this._unsubscribeAll)
    )
    .subscribe((v) => {
      this.truckDriverSearchValue = v;
    });

  const value =
    this.truckDriverSearchValue === undefined
      ? this.trick_driver_name
      : this.truckDriverSearchValue;

  // calling API
  this.allTruckDrivers = this.harvestingService.getEmployees(this.truckDriverSearchValue,'allEmployees','Truck Driver');

        // subscribing to show/hide field UL
        this.allTruckDrivers.subscribe((combineOperators) => {
          console.log(combineOperators);
    if (combineOperators.count === 0) {
      // hiding UL
      this.truckDriverUL = false;
    } else {
      // showing UL
      this.truckDriverUL = true;
    }
  });
}
listClickedTruckDriver(truckdriver) {
  console.log('Truck Driver Object:',truckdriver);
  // hiding UL
  this.truckDriverUL = false;

  // passing name in select's input
  this.trick_driver_name = truckdriver.first_name + ' ' + truckdriver.last_name;

  // to enable submit button
  this.isTruckDriverSelected = false;

  // assigning values in form
this.deliveryTicketForm.patchValue({
  truck_id: truckdriver.id
});

  // clearing array
  this.allTruckDrivers = of([]);
}
//#endregion
}
