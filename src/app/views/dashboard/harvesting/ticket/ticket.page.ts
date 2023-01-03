/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('truckInput') truckInput: ElementRef;
  @ViewChild('kartInput') kartInput: ElementRef;

  role: any;
  isReassign: boolean;
  // isSplitTrue = false;
  isSplitTrue;

  deliveryTicketForm: FormGroup;
  deliveryTicketReassignForm: FormGroup;

  // observables
  allTruckDrivers: Observable<any>;
  allKartOperators: Observable<any>;

  // subjects
  trick_driver_search$ = new Subject();
  kart_operator_search$ = new Subject();

  // input values
  trick_driver_name: any = '';
  kart_operator_name: any = '';

  // input's search values
  truckDriverSearchValue: any;
  kartOperatorSearchValue: any;

  // to show UL's
  truckDriverUL: any = false;
  kartOperatorUL: any = false;

  // for invalid
  isTruckDriverSelected: any = true;
  isKartOperatorSelected: any = true;

  // Profile variables
  customerData: any;
  isLoading: any;

  //reassign variables
  reassignTicketData: any;
  isLoadingTicket$: Observable<any>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private router: Router,
    private formbuildr: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService,
    private renderer: Renderer2
  ) {
    if (!this.router.getCurrentNavigation().extras.state.reassign) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.truckInput.nativeElement) {
          // console.log('Combine');
          this.allTruckDrivers = of([]);
          this.truckDriverUL = false; // to hide the UL
        }
        if (e.target !== this.kartInput.nativeElement) {
          // console.log('Kart');
          this.allKartOperators = of([]);
          this.kartOperatorUL = false; // to hide the UL
        }
      });
    }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    console.log('State:',this.router.getCurrentNavigation().extras.state);
    this.isReassign = this.router.getCurrentNavigation().extras.state.reassign;

    this.deliveryTicketForm = this.formbuildr.group({
      truck_driver_id: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      loaded_miles: ['', [Validators.required]],
      field: [''],
      split_load_check: [false, [Validators.required]],
      kart_scale_weight: ['', [Validators.required]],
      delivery_ticket_number: ['', [Validators.required]],
      kart_operator_id: ['', [Validators.required]],
      truck_driver_company: ['', [Validators.required]],
      truck_id: ['', [Validators.required]],
      split_load: ['', [Validators.required]],
      kart_scale_weight_split: ['', [Validators.required]],
      field_load_split: ['', [Validators.required]],
      status: ['sent'],
      working_status: ['pending'],
      customer_id: [''],
      state: [''],
      farm_id: [''],
      crop_id: [''],
      field_id: [''],
    });
    this.deliveryTicketReassignForm = this.formbuildr.group({
      truck_driver_id: ['', [Validators.required]],
      // destination: ['', [Validators.required]],
      // loaded_miles: ['', [Validators.required]],
      // field: [''],
      // split_load_check: [false, [Validators.required]],
      // kart_scale_weight: ['', [Validators.required]],
      // delivery_ticket_number: ['', [Validators.required]],
      // kart_operator_id: ['', [Validators.required]],
      // truck_driver_company: ['', [Validators.required]],
      // truck_id: ['', [Validators.required]],
      // split_load: ['', [Validators.required]],
      // kart_scale_weight_split: ['', [Validators.required]],
      // field_load_split: ['', [Validators.required]],
      status: ['sent'],
      // working_status: ['pending'],
      // customer_id: [''],
      // state: [''],
      // farm_id: [''],
      // crop_id: [''],
      // field_id: [''],
    });
    if (!this.isReassign) {
      this.truckDriverSearchSubscription();
      this.kartOperatorSearchSubscription();
      this.initApis();
      this.initObservables();
    } else {
      this.getTicketById();
      this.initTicketByIdObservables();
    }
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  initApis() {
    this.harvestingService.getJobTesting('kart-operator');
  }
  initObservables() {
    this.harvestingService.customer$.subscribe((res) => {
      console.log('Ticket:::', res);
      if(res){
        this.customerData = res;
      }
    });

    this.harvestingService.customerLoading$.subscribe((val) => {
      this.isLoading = val;
      if (!val) {
        this.patchForm();
      }
    });
  }
  patchForm() {
    this.deliveryTicketForm.patchValue({
      customer_id: this.customerData.customer_job[0].customer_id,
      state: this.customerData.customer_job[0].state,
      farm_id: this.customerData.customer_job[0].farm_id,
      crop_id: this.customerData.customer_job[0].crop_id,
      field_id: this.customerData.customer_job[0].field_id,
      field: this.customerData.customer_job[0].field_name,
    });
  }
  getTicketById(){
    this.harvestingService.getTicketById(this.router.getCurrentNavigation().extras.state.ticketId,'verify-ticket-kart');
  }
  initTicketByIdObservables(){
    this.isLoadingTicket$ = this.harvestingService.ticketLoading$;

    this.harvestingService.ticket$.subscribe((res)=>{
      console.log('response:',res);
      this.reassignTicketData = res;
      if(res){
      this.patchReassignForm();
      }
    });
  }
  patchReassignForm(){
this.deliveryTicketReassignForm.patchValue({
  truck_driver_id: this.reassignTicketData.truck_driver_id
});
  }
  goBack() {
    this.location.back();
  }
  buttton() {
    this.isSplitTrue = !this.isSplitTrue;
  }
  submit() {
    // navigating
    // this.router.navigateByUrl('/tabs/home/harvesting/ticket/generated-ticket', {
      //   state: {
        //     ticketId: 56565656,
        //   },
        // });
        if (!this.isReassign) {
      console.log(this.deliveryTicketForm.value);
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

            } else {
              console.log('Something happened :)');
            }
          },
          (err) => {
            console.log('Error:', err);
          }
        );

    } else {
      console.log(this.deliveryTicketReassignForm.value);
      this.harvestingService.updateTicket(this.reassignTicketData.delivery_ticket_number,this.deliveryTicketReassignForm.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            // this.deliveryTicketForm.reset();
            // this.trick_driver_name = '';
            this.toastService.presentToast(res.message, 'success');

            // navigating
            // this.router.navigateByUrl('/tabs/home/harvesting/ticket/generated-ticket',{
            //   state:{
            //     ticketId: this.deliveryTicketForm.get('delivery_ticket_number').value
            //   }
            // });

          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
        }
      );


    }

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
        if (value === '') {
          this.isTruckDriverSelected = true;
        }

        // calling API
        this.allTruckDrivers = this.harvestingService.getEmployees(
          this.truckDriverSearchValue,
          'allEmployees',
          'Truck Driver'
        );

        // subscribing to show/hide field UL
        this.allTruckDrivers.subscribe((truckDrivers) => {
          console.log('Truck Drivers:', truckDrivers);

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
    this.allTruckDrivers = this.harvestingService.getEmployees(
      this.truckDriverSearchValue,
      'allEmployees',
      'Truck Driver'
    );

    // subscribing to show/hide field UL
    this.allTruckDrivers.subscribe((truckDrivers) => {
      console.log('truck-drivers:', truckDrivers);
      if (truckDrivers.count === 0) {
        // hiding UL
        this.truckDriverUL = false;
      } else {
        // showing UL
        this.truckDriverUL = true;
      }
    });
  }
  listClickedTruckDriver(truckdriver) {
    console.log('Truck Driver Object:', truckdriver);
    // hiding UL
    this.truckDriverUL = false;

    // passing name in select's input
    this.trick_driver_name =
      truckdriver.first_name + ' ' + truckdriver.last_name;

    // to enable submit button
    this.isTruckDriverSelected = false;

    // assigning values in form
    this.deliveryTicketReassignForm.patchValue({
      truck_driver_id: truckdriver.id,
    });

    // clearing array
    this.allTruckDrivers = of([]);
  }
  //#endregion

  //#region Kart Operator
  kartOperatorSearchSubscription() {
    this.kart_operator_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.kartOperatorSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isKartOperatorSelected = true;
        }

        // calling API
        this.allKartOperators = this.harvestingService.getEmployees(
          this.kartOperatorSearchValue,
          'allEmployees',
          'Cart Operator'
        );

        // subscribing to show/hide field UL
        this.allKartOperators.subscribe((kartoperaotrs) => {
          console.log('Kart Operator:', kartoperaotrs);

          if (kartoperaotrs.count === 0) {
            // hiding UL
            this.kartOperatorUL = false;
          } else {
            this.kartOperatorUL = true;
          }
        });
      });
  }
  inputClickedKartOperator() {
    // getting the serch value to check if there's a value in input
    this.kart_operator_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.kartOperatorSearchValue = v;
      });

    const value =
      this.kartOperatorSearchValue === undefined
        ? this.kart_operator_name
        : this.kartOperatorSearchValue;

    // calling API
    this.allKartOperators = this.harvestingService.getEmployees(
      this.kartOperatorSearchValue,
      'allEmployees',
      'Cart Operator'
    );

    // subscribing to show/hide field UL
    this.allKartOperators.subscribe((kartoperators) => {
      console.log(kartoperators);
      if (kartoperators.count === 0) {
        // hiding UL
        this.kartOperatorUL = false;
      } else {
        // showing UL
        this.kartOperatorUL = true;
      }
    });
  }
  listClickedKartOperator(kartoperator) {
    console.log('Kart Operator Object:', kartoperator);
    // hiding UL
    this.kartOperatorUL = false;

    // passing name in select's input
    this.kart_operator_name =
      kartoperator.first_name + ' ' + kartoperator.last_name;

    // to enable submit button
    this.isTruckDriverSelected = false;

    // assigning values in form
    this.deliveryTicketForm.patchValue({
      kart_operator_id: kartoperator.id,
    });

    // clearing array
    this.allTruckDrivers = of([]);
  }
  //#endregion
}
