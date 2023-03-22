import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FarmingService } from './../../farming.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-complete-existing-order',
  templateUrl: './complete-existing-order.page.html',
  styleUrls: ['./complete-existing-order.page.scss'],
})
export class CompleteExistingOrderPage implements OnInit {

  completeExistingWorkOrder: FormGroup;
  data: any;

  // Machinery Data
  @ViewChild('machineryInput') machineryInput: ElementRef;
  isMachinerySelected: any = true;
  machinery_search$ = new Subject();
  machinery_name: any = '';
  machinerySearchValue: any;
  allMachinery: Observable<any>;
  machineryUL: any = false;

  // Dispatcher Data
  @ViewChild('dispatcherInput') dispatcherInput: ElementRef;
  isDispatcherSelected: any = true;
  dispatcher_search$ = new Subject();
  dispatcher_name: any = '';
  dispatcherSearchValue: any;
  allDispatchers: Observable<any>;
  dispatcherUL: any = false;

  //Customer Data
  @ViewChild('customerInput') customerInput: ElementRef;
  isCustomerSelected: any = true;
  customer_search$ = new Subject();
  customer_name: any = '';
  customerSearchValue: any;
  allCustomers: Observable<any>;
  customerUL: any = false;
  customerId: any;

  // Farm Data
  @ViewChild('farmsInput') farmsInput: ElementRef;
  isFarmSelected: any = true;
  farm_search$ = new Subject();
  farm_name: any = '';
  farmSearchValue: any;
  allFarms: Observable<any>;
  farmUL: any = false;
  farmId: any;

  // Field Data
  @ViewChild('fieldsInput') fieldsInput: ElementRef;
  isFieldSelected: any = true;
  field_search$ = new Subject();
  field_name: any = '';
  fieldSearchValue: any;
  allFields: Observable<any>;
  fieldUL: any = false;

  field_address: any = '';
  phone: any = '';

  // Service Data
  @ViewChild('serviceInput') serviceInput: ElementRef;
  isServiceSelected: any = true;
  service_search$ = new Subject();
  serviceSearchValue: any;
  allServices: Observable<any>;
  serviceUL: any = false;
  service_name: any = '';

  isFieldDisabled: any = true;
  isDisabled: any = true;
  public loadingSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private toast: ToastService, private farmingService: FarmingService, private activeRoute: Router, private formBuilder: FormBuilder, private activatedR: ActivatedRoute, private renderer: Renderer2) {
    this.activatedR.params.subscribe(params => {
      console.log("Required Data: ", params);

      this.data = params;
      this.customerId = this.data.customer_id;

      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.dispatcherInput.nativeElement) {
          this.allDispatchers = of([]); // to clear array
          this.dispatcherUL = false; // to hide the UL
        }
        if (e.target !== this.customerInput.nativeElement) {
          // if (this.customerSearchValue === '' || this.customerSearchValue === undefined) {
          //   this.isDisabled = true;
          //   this.farm_name = '';
          //   this.customerUL = false; // to hide the UL
          //   this.isCustomerSelected = true;
          //   this.isFarmSelected = true;
          //   this.isFieldDisabled = true;
          // }
          // else {
          //   this.isDisabled = false;
          //   this.allCustomers = of([]); // to clear array     
          //   this.customerUL = false; // to hide the UL
          // }
          this.allCustomers = of([]); // to clear array
          this.customerUL = false; // to hide the UL
          this.isDisabled = this.completeExistingWorkOrder.controls['customerId'].value === '' ? true : false;
        }
        if (e.target !== this.farmsInput.nativeElement) {
          // if (this.farmSearchValue === '' || this.farmSearchValue === undefined) {
          //   this.isFieldDisabled = true;
          //   this.field_name = '';
          //   this.farmUL = false;
          // } else {
          //   this.isFieldDisabled = false;
          //   this.allFarms = of([]);
          // }
          this.allFarms = of([]); // to clear array
          this.farmUL = false; // to hide the UL
        }
        if (e.target !== this.fieldsInput.nativeElement) {
          // if (this.fieldSearchValue === '' || this.farmSearchValue === undefined) {
          //   this.completeExistingWorkOrder.patchValue({
          //     totalAcres: null
          //   });
          //   this.allFields = of([]); // to clear array
          //   this.fieldUL = false; // to hide the UL

          // } else {
          //   this.allFields = of([]); // to clear array
          //   this.fieldUL = false; // to hide the UL
          // }
          this.allFields = of([]); // to clear array
          this.fieldUL = false; // to hide the UL
        }
        if (e.target !== this.machineryInput.nativeElement) {
          this.allMachinery = of([]); // to clear array
          this.machineryUL = false; // to hide the UL
        }
        if (e.target !== this.serviceInput.nativeElement) {
          this.allServices = of([]); // to clear array
          this.serviceUL = false; // to hide the UL
        }
      });
    })
  }

  ngOnInit() {
    this.isCustomerSelected = false;
    this.isFarmSelected = false;
    this.isFieldSelected = false;
    this.isServiceSelected = false;

    this.machinerySearchSubscription();
    this.dispatcherSearchSubscription();
    this.customerSearchSubscription();
    this.farmSearchSubscription();
    this.fieldSearchSubscription();
    // this.serviceSearchSubscription();

    this.completeExistingWorkOrder = this.formBuilder.group({
      workOrderId: [this.data.work_order_id],
      machineryID: ['', [Validators.required]],
      beginningEngineHours: ['', [Validators.required]],
      dispatcherId: [this.data.dispatcher_id, [Validators.required]],
      customerId: [this.data.customer_id, [Validators.required]],
      farmId: [this.data.farm_id, [Validators.required]],
      fieldId: [this.data.field_id, [Validators.required]],
      service: [this.data.service, [Validators.required]],
      tractorDriverId: [localStorage.getItem('employeeId')],
      fieldAddress: [this.data.address, [Validators.required]],
      phone: [this.data.customer_phone, [Validators.required]],
      totalAcres: [this.data.totalAcres]
    });

    this.dispatcher_name = this.data.dispatcher_name;
    this.customer_name = this.data.customer_first_name;
    this.farm_name = this.data.farm_name;
    this.field_name = this.data.field_name;
    this.service_name = this.data.service
  }

  navigateTo(nav: string) {
    this.loadingSpinner.next(true)

    this.completeExistingWorkOrder.value.completeInfo = true;
    console.log(this.completeExistingWorkOrder.value);
    this.farmingService.updateWorkOrder(this.completeExistingWorkOrder.value, 'Tractor Driver', 'existingWorkOrder')
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast("Work Order has been updated successfully!", 'success');
            this.activeRoute.navigateByUrl(nav);
            this.loadingSpinner.next(false)

          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
          this.loadingSpinner.next(false)

        },
      );
  }

  //#region Machinery
  machinerySearchSubscription() {
    this.machinery_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isMachinerySelected = true; }
        this.allMachinery = this.farmingService.getMachinery(
          value,
          'allMotorizedVehicles'
        );

        // subscribing to show/hide Field UL
        this.allMachinery.subscribe((machinery) => {
          if (machinery.count === 0) {
            // hiding UL
            this.machineryUL = false;
          } else {
            // showing UL
            this.machineryUL = true;
          }
        });
      });
  }

  inputClickedMachinery() {
    // getting the serch value to check if there's a value in input
    this.machinery_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.machinerySearchValue = v;
      });

    const value =
      this.machinerySearchValue === undefined
        ? this.machinery_name
        : this.machinerySearchValue;

    // calling API
    this.allMachinery = this.farmingService.getMachinery(
      value,
      'allMotorizedVehicles'
    );

    // subscribing to show/hide farm UL
    this.allMachinery.subscribe((machinery) => {

      if (machinery.count === 0) {
        // hiding UL
        this.machineryUL = false;
      } else {
        // showing UL
        this.machineryUL = true;
      }
    });
  }
  listClickedMachinery(machinery) {

    // hiding UL
    this.machineryUL = false;
    console.log(machinery);

    // assigning values in form
    this.completeExistingWorkOrder.patchValue({
      machineryID: machinery.id,
      beginningEngineHours: machinery.odometer_reading_end
    });
    // clearing array
    this.allMachinery = of([]);

    // For Specific Fields
    // this.fieldId = field.id;

    // passing name in select's input
    this.machineryInput.nativeElement.value = machinery.type;

    // to enable submit button
    this.isMachinerySelected = false;
  }
  //#endregion

  //#region Dispatcher
  dispatcherSearchSubscription() {
    this.dispatcher_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isDispatcherSelected = true; }

        if (localStorage.getItem('role').includes('Dispatcher')) {
          this.allDispatchers = this.farmingService.getEmployees(
            value,
            'allEmployees',
            'Tractor Driver'
          );
        }
        else {
          this.allDispatchers = this.farmingService.getEmployees(
            value,
            'allEmployees',
            'Dispatcher'
          );
        }

        // subscribing to show/hide Field UL
        this.allDispatchers.subscribe((dispatcher) => {
          if (dispatcher.count === 0) {
            // hiding UL
            this.dispatcherUL = false;
          } else {
            // showing UL
            this.dispatcherUL = true;
          }
        });
      });
  }

  inputClickedDispatcher() {
    // getting the serch value to check if there's a value in input
    this.dispatcher_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.dispatcherSearchValue = v;
      });

    const value =
      this.dispatcherSearchValue === undefined
        ? this.dispatcher_name
        : this.dispatcherSearchValue;

    // calling API
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.allDispatchers = this.farmingService.getEmployees(
        value,
        'allEmployees',
        'Tractor Driver'
      );
    } else {
      this.allDispatchers = this.farmingService.getEmployees(
        value,
        'allEmployees',
        'Dispatcher'
      );
    }
    // subscribing to show/hide farm UL
    this.allDispatchers.subscribe((dispatcher) => {
      console.log(dispatcher);

      if (dispatcher.count === 0) {
        // hiding UL
        this.dispatcherUL = false;
      } else {
        // showing UL
        this.dispatcherUL = true;
      }
    });
  }
  listClickedDispatcher(dispatcher) {

    console.log(dispatcher);

    // hiding UL
    this.dispatcherUL = false;

    // assigning values in form
    this.completeExistingWorkOrder.patchValue({
      dispatcherId: dispatcher.id
    });

    // clearing array
    this.allDispatchers = of([]);

    // For Specific Fields
    // this.fieldId = field.id;

    // passing name in select's input
    this.dispatcherInput.nativeElement.value = dispatcher.first_name;

    // to enable submit button
    this.isDispatcherSelected = false;
  }
  //#endregion

  //  #region Customer
  customerSearchSubscription() {
    // clearing array to show only spiner
    this.allCustomers = of([]);

    this.customer_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2       
        this.customerSearchValue = value;

        // for asterik to look required
        if (value === '') { this.isCustomerSelected = true; }

        this.allCustomers = this.farmingService.getCustomers(
          value,
          'true',
          'allCustomers'
        );
        // showing UL
        this.customerUL = true;

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers) => {
          if (customers.count === 0) {
            this.isDisabled = true;
            this.isFieldDisabled = true

            // clearing the input values in farm, crop after getting disabled
            this.farm_name = '';
            this.field_name = ''

            // hiding UL
            this.customerUL = false;
          } else {
            this.isDisabled = false;
          }
        });
      });
  }
  inputClickedCustomer() {
    // getting the serch value to check if there's a value in input
    this.customer_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.customerSearchValue = v;
      });

    const value =
      this.customerSearchValue === undefined
        ? this.customer_name
        : this.customerSearchValue;

    // calling API
    this.allCustomers = this.farmingService.getCustomers(
      value,
      'true',
      'allCustomers'
    );

    // subscribing to disable & enable farm, crop inputs
    this.allCustomers.subscribe((customers) => {
      console.log(customers);

      // this.isDisabled = customers.count === 0 ? true : false;
      if (customers.count === 0) {
        this.isDisabled = true;

        // clearing the input values in farm, crop after getting disabled
        // this.farm_name = '';
        // this.crop_name = '';

        // hiding UL
        this.customerUL = false;
      } else {
        this.isDisabled = false;
        // showing UL
        this.customerUL = true;
      }
    });
  }

  listClickedCustomer(customer) {
    // clearing array
    this.allCustomers = of([]);
    // this.allFarms = of([]);
    // this.allFarmsClicked = of([]);
    // this.allCrops = of([]);
    // this.allCropsClicked = of([]);

    // clearing value from farm & crop input
    // this.farm_name = '';
    // this.crop_name = '';

    // hiding UL
    this.customerUL = false;

    // assigning values in form
    this.completeExistingWorkOrder.patchValue({
      customerId: customer.id,
      phone: customer.phone_number
    });
    // passing name in select's input
    this.customerInput.nativeElement.value = customer.customer_name;

    // passing name in customer-search-value in Rendered2 for checks 
    this.customerSearchValue = customer.customer_name;

    // to enable submit button
    this.isCustomerSelected = false;

    // passing the customer id to  select farm & crop id
    this.customerId = customer.id;
    console.log(this.customer_name);
    console.log(this.customerId);

  }
  //#endregion

  //  #region Farm
  farmSearchSubscription() {
    this.farm_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2       
        this.farmSearchValue = value;

        // for asterik to look required
        if (value === '') { this.isFarmSelected = true; }
        this.allFarms = this.farmingService.getFarms(
          value,
          this.customerId,
          'customerFarms'
        );

        // subscribing to show/hide farm UL
        this.allFarms.subscribe((farms) => {
          if (farms.count === 0) {
            // hiding UL
            this.farmUL = false;
            this.isFieldDisabled = true;
          } else {
            // showing UL
            this.farmUL = true;
            this.isFieldDisabled = false;
          }
        });
      });
  }

  inputClickedFarm() {
    // getting the serch value to check if there's a value in input
    this.farm_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.farmSearchValue = v;
      });

    const value =
      this.farmSearchValue === undefined
        ? this.farm_name
        : this.farmSearchValue;

    // calling API
    this.allFarms = this.farmingService.getFarms(
      value,
      this.customerId,
      'customerFarms'
    );

    // subscribing to show/hide farm UL
    this.allFarms.subscribe((farms) => {
      if (farms.count === 0) {
        // hiding UL
        this.farmUL = false;
        this.isFieldDisabled = true;
      } else {
        // showing UL
        this.farmUL = true;
        this.isFieldDisabled = false;
      }
    });
  }
  listClickedFarm(farm) {
    // hiding UL
    this.farmUL = false;

    // assigning values in form
    this.completeExistingWorkOrder.patchValue({
      farmId: farm.id
    });
    // clearing array
    this.allFarms = of([]);

    // passing name in farm-search-value in Rendered2 for checks 
    this.farmSearchValue = farm.name;

    // For Specific Fields
    this.farmId = farm.id;

    // passing name in select's input
    this.farmsInput.nativeElement.value = farm.name;

    // to enable submit button
    this.isFarmSelected = false;
  }

  //#endregion

  //#region Field
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
        if (value === '') { this.isFieldSelected = true; }
        this.allFields = this.farmingService.getFields(
          value,
          this.customerId,
          this.farmId,
          'customerFields'
        );

        // subscribing to show/hide Field UL
        this.allFields.subscribe((fields) => {
          if (fields.count === 0) {
            // hiding UL
            this.fieldUL = false;
            this.completeExistingWorkOrder.patchValue({
              totalAcres: null
            });
          } else {
            // showing UL
            this.fieldUL = true;
          }
        });
      });
  }

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

    // calling API
    this.allFields = this.farmingService.getFields(
      value,
      this.customerId,
      this.farmId,
      'customerFields'
    );

    // subscribing to show/hide farm UL
    this.allFields.subscribe((fields) => {

      if (fields.count === 0) {
        // hiding UL
        this.fieldUL = false;
        this.completeExistingWorkOrder.patchValue({
          totalAcres: null
        });
      } else {
        // showing UL
        this.fieldUL = true;
      }
    });
  }
  listClickedField(field) {

    // hiding UL
    this.fieldUL = false;

    console.log(field);

    // assigning values in form
    this.completeExistingWorkOrder.patchValue({
      fieldId: field.field_id,
      totalAcres: field.acres
    });

    // clearing array
    this.allFields = of([]);

    // For Specific Fields
    // this.fieldId = field.id;

    // passing name in select's input
    this.fieldsInput.nativeElement.value = field.field_name;

    // passing name in customer-search-value in Rendered2 for checks 
    this.fieldSearchValue = field.field_name;

    // to enable submit button
    this.isFieldSelected = false;
  }
  //#endregion

  //#region Service
  serviceSearchSubscription() {
    this.service_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isServiceSelected = true; }
        this.allServices = this.farmingService.getServices(
          value,
          this.customerId,
          'getFarmingServices'
        );

        // subscribing to show/hide Field UL
        this.allServices.subscribe((service) => {
          if (service.count === 0) {
            // hiding UL
            this.serviceUL = false;
          } else {
            // showing UL
            this.serviceUL = true;
          }
        });
      });
  }

  inputClickedService() {
    // getting the serch value to check if there's a value in input
    this.service_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.serviceSearchValue = v;
      });

    const value =
      this.serviceSearchValue === undefined
        ? this.service_name
        : this.serviceSearchValue;

    // calling API
    this.allServices = this.farmingService.getServices(
      value,
      this.customerId,
      'getFarmingServices'
    );

    // subscribing to show/hide farm UL
    this.allServices.subscribe((service) => {
      console.log(service.customer_farms);

      if (service.count === 0) {
        // hiding UL
        this.serviceUL = false;
      } else {
        // showing UL
        this.serviceUL = true;
      }
    });
  }
  listClickedService(service) {

    // hiding UL
    this.serviceUL = false;

    console.log(service);

    // assigning values in form

    this.completeExistingWorkOrder.patchValue({
      service: service
    });
    // clearing array
    this.allServices = of([]);

    // For Specific Fields
    // this.fieldId = field.id;

    // passing name in select's input
    this.serviceInput.nativeElement.value = service;

    // to enable submit button
    this.isServiceSelected = false;
  }
  //#endregion
  disableFields() {
    this.isDisabled = true;
  }
}
