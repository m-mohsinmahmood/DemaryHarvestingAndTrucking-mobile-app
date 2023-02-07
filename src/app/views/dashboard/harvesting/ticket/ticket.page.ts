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
  @ViewChild('fieldInput') fieldInput: ElementRef;

  role: any;
  isReassign: boolean;
  // isSplitTrue = false;
  isSplitTrue;

  deliveryTicketForm: FormGroup;
  deliveryTicketReassignForm: FormGroup;

  // observables
  allTruckDrivers: Observable<any>;
  allKartOperators: Observable<any>;
  allFields: Observable<any>;

  // subjects
  trick_driver_search$ = new Subject();
  kart_operator_search$ = new Subject();
  field_search$ = new Subject();

  // input values
  trick_driver_name: any = '';
  kart_operator_name: any = '';
  field_name: any = '';

  // input's search values
  truckDriverSearchValue: any;
  kartOperatorSearchValue: any;
  fieldSearchValue: any;

  // to show UL's
  truckDriverUL: any = false;
  kartOperatorUL: any = false;
  fieldUL: any = false;

  // for invalid
  isTruckDriverSelected: any = true;
  isKartOperatorSelected: any = true;
  isFieldSelected: any = true;

  // Profile variables
  customerData: any;
  isLoading: any;
  isFieldDisabled: any = false;

  //reassign variables
  reassignTicketData: any;
  isLoadingTicket$: Observable<any>;

  // machinery variables
  allMachinery: Observable<any>;
  machine_search$ = new Subject();
  machine_name: any = '';
  machineSearchValue: any = '';
  machineUL: any = false;
  isMachineSelected: any = true;

  add_location_overlay = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private router: Router,
    private formbuildr: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService,
    private renderer: Renderer2
  ) {
    if (!this.router.getCurrentNavigation()?.extras?.state?.reassign) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.truckInput?.nativeElement) {
          // this.allTruckDrivers = of([]);
          this.truckDriverUL = false; // to hide the UL
        }
        if (e.target !== this.kartInput?.nativeElement) {
          this.allKartOperators = of([]);
          this.kartOperatorUL = false; // to hide the UL
        }

        if (e.target !== this.fieldInput?.nativeElement) {
          // this.allFields = of([]);
          this.fieldUL = false; // to hide the UL
        }
      });
    }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.isReassign =
      this.router.getCurrentNavigation().extras?.state?.reassign;

    this.deliveryTicketForm = this.formbuildr.group({
      truckDriverId: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      loadedMiles: ['', [Validators.required]],
      field: [''],
      split_load_check: [false, [Validators.required]],
      delivery_ticket_number: ['', [Validators.required]],
      kartOperatorId: ['', [Validators.required]],
      truck_driver_company: ['', [Validators.required]],
      truckId: ['', [Validators.required]],
      splitLoad: ['', [Validators.required]],
      kartScaleWeight: ['', [Validators.required]],
      kart_scale_weight_split: ['', [Validators.required]],
      field_load_split: ['', [Validators.required]],
      status: ['sent'],
      working_status: ['pending'],
      customerId: [''],
      state: [''],
      farmId: [''],
      cropId: [''],
      cropName: [''],
      fieldId: [''],
    });

    this.deliveryTicketReassignForm = this.formbuildr.group({
      truck_driver_id: ['', [Validators.required]],
      status: ['sent'],
    });

    if (!this.isReassign) {
      // Search
      this.truckDriverSearchSubscription();
      this.kartOperatorSearchSubscription();
      this.fieldSearchSubscription();
      this.machineSearchSubscription();

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
    this.harvestingService.getJobTesting2(
      'kart-operator',
      'f4cfa75b-7c14-4b68-a192-00d56c9f2022'
    );
  }

  initObservables() {
    this.harvestingService.customer$.subscribe((response) => {
      if (response) {
        // Customer Data!
        this.customerData = response;
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
      kartOperatorId: 'f4cfa75b-7c14-4b68-a192-00d56c9f2022',
      customerId: this.customerData.customer_job[0]?.customer_id,
      state: this.customerData.customer_job[0]?.state,
      farmId: this.customerData.customer_job[0]?.farm_id,
      cropId: this.customerData.customer_job[0]?.crop_id,
      cropName: this.customerData.customer_job[0]?.crop,
      fieldId: this.customerData.customer_job[0]?.field_id,
      field: this.customerData.customer_job[0]?.field_name,
    });
    console.log('patchForm', this.deliveryTicketForm.value);
  }

  patchReassignForm() {
    this.deliveryTicketReassignForm.patchValue({
      truckDriverId: this.reassignTicketData.truck_driver_id,
    });
  }

  getTicketById() {
    this.harvestingService.getTicketById(
      this.router.getCurrentNavigation().extras.state.ticketId,
      'verify-ticket-kart'
    );
  }

  initTicketByIdObservables() {
    this.isLoadingTicket$ = this.harvestingService.ticketLoading$;

    this.harvestingService.ticket$.subscribe((res) => {
      // console.log('response:', res);
      this.reassignTicketData = res;
      if (res) {
        this.patchReassignForm();
      }
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
    if (!this.isReassign) {
      console.log('deliveryTicketForm', this.deliveryTicketForm.value);
      this.harvestingService.kartOperatorCreateDeliveryTicket('createDeliveryTicket',this.deliveryTicketForm.value)
        .subscribe((response: any) => {
            // console.log('response', response);
            if (response?.status === 200) {
              // this.deliveryTicketForm.reset();
              this.trick_driver_name = '';
              this.toastService.presentToast(
                'Delivery Ticket has been created.',
                'success'
              );
              this.goBack();
            } else {
              console.log('Something happened :)');
            }},
          (err) => {console.log('Error:', err); }
        );
    } else {
      console.log(
        'deliveryTicketReassignForm',
        this.deliveryTicketReassignForm.value
      );
      this.harvestingService
        .updateTicket(
          this.reassignTicketData.delivery_ticket_number,
          this.deliveryTicketReassignForm.value
        )
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
    this.allTruckDrivers = this.getKartOperatorTruckDrivers(
      this.truckDriverSearchValue
    );

    // console.log('allTruckDrivers', this.allTruckDrivers);
    // subscribing to show/hide field UL
    this.allTruckDrivers.subscribe((truckDrivers) => {
      // console.log('truck-drivers:', truckDrivers);
      if (truckDrivers.length === 0) {
        // hiding UL
        this.truckDriverUL = false;
      } else {
        // showing UL
        this.truckDriverUL = true;
      }
    });
  }

  listClickedTruckDriver(truckdriver) {
    // console.log('Truck Driver Object:', truckdriver);

    this.deliveryTicketForm.patchValue({
      truckDriverId: truckdriver.id,
    });
    // hiding UL
    this.truckDriverUL = false;

    // passing name in select's input
    this.trick_driver_name = truckdriver.name;

    // to enable submit button
    this.isTruckDriverSelected = false;

    // assigning values in form
    this.deliveryTicketReassignForm.patchValue({
      truckDriverId: truckdriver.id,
    });

    // clearing array
    // this.allTruckDrivers = of([]);
  }

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
        this.allTruckDrivers = this.getKartOperatorTruckDrivers(
          this.truckDriverSearchValue
        );

        // subscribing to show/hide field UL
        this.allTruckDrivers.subscribe((truckDrivers) => {
          // console.log('Truck Drivers:', truckDrivers);

          if (truckDrivers.length === 0) {
            // hiding UL
            this.truckDriverUL = false;
          } else {
            this.truckDriverUL = true;
          }
        });
      });
  }
  //#endregion

  //#region Kart Operator
  getKartOperatorTruckDrivers(search) {
    let drivers = new Subject<any>();
    this.harvestingService
      .getKartOperatorTruckDrivers(
        'kartOperatorTruckDrivers',
        'f4cfa75b-7c14-4b68-a192-00d56c9f2022',
        search
      )
      .subscribe(
        (res: any) => {
          // console.log('response', res);
          drivers.next(res);
        },
        (err) => {
          console.log('Error:', err);
        }
      );

    return drivers.asObservable();
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
      kartOperatorId: kartoperator.id,
    });

    // clearing array
    // this.allTruckDrivers = of([]);
  }

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
  //#endregion

  //#region Field
  inputClickedField() {
    // getting the serch value to check if there's a value in input
    this.field_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.fieldSearchValue = v;
      });

    const value =
      this.fieldSearchValue === undefined
        ? this.field_name
        : this.fieldSearchValue;

    // calling API // need id to check
    this.allFields = this.harvestingService.getFields(
      value,
      'customerFields',
      this.customerData.customer_job[0].customer_id,
      this.customerData.customer_job[0].farm_id
    );

    // subscribing to show/hide field UL
    this.allFields.subscribe((fields) => {
      console.log('first', fields);
      if (fields.count === 0) {
        // hiding UL
        this.fieldUL = false;
      } else {
        // showing UL
        this.fieldUL = true;
      }
    });
  }

  listClickedField(field) {
    this.deliveryTicketForm.patchValue({
      fieldId: field?.field_id,
      field: field?.field_name,
    });
    // hiding UL
    this.fieldUL = false;

    // passing name in select's input
    this.field_name = field.field_name;

    // to enable submit button
    this.isFieldSelected = false;

    // assigning values in form conditionally
    if (this.role === 'kart-operator') {
      // this.changeFieldFormKart.patchValue({
      //   field_id_new: field.field_id,
      // });
    }

    // clearing array
    this.allFields = of([]);
  }

  fieldSearchSubscription() {
    this.field_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.fieldSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isFieldSelected = true;
        }

        // calling API
        this.allFields = this.harvestingService.getFields(
          value,
          'customerFields',
          this.customerData.customer_job[0].customer_id,
          this.customerData.customer_job[0].farm_id
        );

        // subscribing to show/hide field UL
        this.allFields.subscribe((fields) => {
          if (fields.count === 0) {
            // hiding UL
            this.fieldUL = false;
          } else {
            this.fieldUL = true;
          }
        });
      });
  }
  //#endregion

  //#region Truck ID
  machineSearchSubscription() {
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.machineSearchValue = value;
        // for asterik to look required
        if (value === '') {
          this.isMachineSelected = true;
        }

        // calling API
        // this.allFields = this.harvestingService.getFields(
        //   value,
        //   'customerFields',
        //   this.customerID,
        //   this.farmID
        // );
        this.allMachinery = this.harvestingService.getMachinery(
          value,
          'allMotorizedVehicles'
        );

        // subscribing to show/hide machine UL
        this.allMachinery.subscribe((machine) => {
          if (machine.count === 0) {
            // hiding UL
            this.machineUL = false;
            this.isMachineSelected = true;
          } else {
            this.machineUL = true;
          }
        });
      });
  }
  inputClickedMachinery() {
    // getting the serch value to check if there's a value in input
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.machineSearchValue = v;
      });

    const value =
      this.machineSearchValue === undefined
        ? this.machine_name
        : this.machineSearchValue;

    // calling API
    this.allMachinery = this.harvestingService.getMachinery(
      value,
      'allMotorizedVehicles'
    );

    // subscribing to show/hide field UL
    this.allMachinery.subscribe((machinery) => {
      console.log('--', machinery);
      if (machinery.count === 0) {
        // hiding UL
        this.machineUL = false;
      } else {
        // showing UL
        this.machineUL = true;
      }
    });
  }
  listClickedMachiney(machinery) {
    console.log('Machinery Object:', machinery);
    // hiding UL
    this.machineUL = false;

    // passing name in select's input
    this.machine_name = machinery.type;

    // to enable submit button
    this.isMachineSelected = false;

    // assigning values in form conditionally
    this.deliveryTicketForm.patchValue({
      truckId: machinery?.id,
    });

    // clearing array
    // this.allMachinery = of([]);
  }
  //#endregion
}
