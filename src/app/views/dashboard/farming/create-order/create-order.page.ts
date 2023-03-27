import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FarmingService } from './../farming.service';
import { ToastService } from './../../../../services/toast/toast.service';
import { states } from 'src/JSON/state';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {
  @ViewChild('dispatcherInput') dispatcherInput: ElementRef;
  @ViewChild('customerInput') customerInput: ElementRef;
  @ViewChild('farmsInput') farmsInput: ElementRef;
  @ViewChild('fieldsInput') fieldsInput: ElementRef;
  @ViewChild('machineryInput') machineryInput: ElementRef;
  @ViewChild('serviceInput') serviceInput: ElementRef;

  role = '';
  createOrderDispatcher: FormGroup;
  createOrderTDriver: FormGroup;

  //For Invalid
  isDispatcherSelected: any = true;
  isCustomerSelected: any = true;
  isFarmSelected: any = true;
  isFieldSelected: any = true;
  isMachinerySelected: any = true;
  isServiceSelected: any = true;

  // subjects
  dispatcher_search$ = new Subject();
  customer_search$ = new Subject();
  farm_search$ = new Subject();
  field_search$ = new Subject();
  machinery_search$ = new Subject();
  service_search$ = new Subject();

  // input values
  dispatcher_name: any = '';
  customer_name: any = '';
  farm_name: any = '';
  field_name: any = '';
  machinery_name: any = '';
  service_name: any = '';

  // input's search values
  dispatcherSearchValue: any;
  customerSearchValue: any;
  farmSearchValue: any;
  fieldSearchValue: any;
  machinerySearchValue: any;
  serviceSearchValue: any;

  // observables
  allDispatchers: Observable<any>;
  allCustomers: Observable<any>;
  allFarms: Observable<any>;
  allFields: Observable<any>;
  allMachinery: Observable<any>;
  allServices: Observable<any>;
  isDisabled: any = true;
  isFieldDisabled: any = true;

  // to show UL's
  dispatcherUL: any = false;
  customerUL: any = false;
  farmUL: any = false;
  fieldUL: any = false;
  machineryUL: any = false;
  serviceUL: any = false;

  //Customer ID for selected Farms
  customerId: any;
  //Farm ID for selected Fields
  farmId: any;
  employeeName: any;
  states: string[];


  public loadingSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private toast: ToastService, private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService, private renderer: Renderer2) {
    if (localStorage.getItem('role').includes('Tractor Driver')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.dispatcherInput.nativeElement) {
          this.allDispatchers = of([]); // to clear array
          this.dispatcherUL = false; // to hide the UL
        }
        if (e.target !== this.customerInput.nativeElement) {
          if (this.customerSearchValue === '' || this.customerSearchValue === undefined) {
            this.isDisabled = true;
            this.farm_name = '';
            this.customerUL = false; // to hide the UL
            this.isCustomerSelected = true;
            this.isFarmSelected = true;
            this.isFieldDisabled = true;
          }
          else {
            this.isDisabled = false;
            this.allCustomers = of([]); // to clear array     
            this.customerUL = false; // to hide the UL
          }
        }
        if (e.target !== this.farmsInput.nativeElement) {
          if (this.farmSearchValue === '' || this.farmSearchValue === undefined) {
            this.isFieldDisabled = true;
            this.field_name = '';
            this.farmUL = false;
          } else {
            this.isFieldDisabled = false;
            this.allFarms = of([]);
          }
        }
        if (e.target !== this.fieldsInput.nativeElement) {
          if (this.fieldSearchValue === '' || this.farmSearchValue === undefined) {
            this.createOrderDispatcher.patchValue({
              totalAcres: null
            });
            this.allFields = of([]); // to clear array
            this.fieldUL = false; // to hide the UL

          } else {
            this.allFields = of([]); // to clear array
            this.fieldUL = false; // to hide the UL
          }
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
    }
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.customerInput.nativeElement) {
          console.log('----', this.customerSearchValue);
          if (this.customerSearchValue === '' || this.customerSearchValue === undefined) {
            this.isDisabled = true;
            this.farm_name = '';
            this.customerUL = false; // to hide the UL
            this.isCustomerSelected = true;
            this.isFarmSelected = true;
            this.isFieldDisabled = true;
          }
          else {
            this.isDisabled = false;
            this.allCustomers = of([]); // to clear array     
            this.customerUL = false; // to hide the UL
          }
        }
        if (e.target !== this.farmsInput.nativeElement) {
          if (this.farmSearchValue === '' || this.farmSearchValue === undefined) {
            this.isFieldDisabled = true;
            this.field_name = '';
            this.farmUL = false;
          } else {
            this.isFieldDisabled = false;
            this.allFarms = of([]);
            // this.farmUL = false; // to hide the UL
          }
        }

        if (e.target !== this.fieldsInput.nativeElement) {
          // this.allFields = of([]); // to clear array
          // this.fieldUL = false; // to hide the UL
          if (this.fieldSearchValue === '' || this.farmSearchValue === undefined) {
            // this.createOrderDispatcher.controls.totalAcres.setValue('');
            this.createOrderDispatcher.patchValue({
              totalAcres: null
            });
            this.allFields = of([]); // to clear array
            this.fieldUL = false; // to hide the UL

          } else {
            this.allFields = of([]); // to clear array
            this.fieldUL = false; // to hide the UL
          }
        }
        if (e.target !== this.dispatcherInput.nativeElement) {
          this.allDispatchers = of([]); // to clear array
          this.dispatcherUL = false; // to hide the UL
        }
        if (e.target !== this.serviceInput.nativeElement) {
          this.allServices = of([]); // to clear array
          this.serviceUL = false; // to hide the UL
        }
      });
    }
  }

  ngOnInit() {
    // pasing states
    this.states = states;

    this.farmingService.getEmployeesById(localStorage.getItem('employeeId')).subscribe(param => {
      console.log(param);
      this.employeeName = param.employee_info.first_name + ' ' + param.employee_info.last_name;
    })

    this.dispatcherSearchSubscription();
    this.customerSearchSubscription();
    this.farmSearchSubscription();
    this.fieldSearchSubscription();
    this.machinerySearchSubscription();
    this.serviceSearchSubscription();

    this.role = localStorage.getItem('role');

    this.createOrderDispatcher = this.formBuilder.group({
      dispatcherId: [localStorage.getItem('employeeId')],
      customerId: ['', [Validators.required]],
      farmId: ['', [Validators.required]],
      fieldId: ['', [Validators.required]],
      state: ['', [Validators.required]],
      service: ['', [Validators.required]],
      tractorDriverId: ['', [Validators.required]],
      fieldAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      totalAcres: ['']
    });

    this.createOrderTDriver = this.formBuilder.group({
      tractorDriverId: [localStorage.getItem('employeeId')],
      machineryID: ['', [Validators.required]],
      beginningEngineHours: ['', [Validators.required]],
      dispatcherId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      farmId: ['', [Validators.required]],
      state: ['', [Validators.required]],
      fieldId: ['', [Validators.required]],
      service: ['', [Validators.required]],
      fieldAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      totalAcres: ['']
    });
  }

  navigateTo(nav: string) {
    if (this.role.includes('Dispatcher')) {
      console.log(this.createOrderDispatcher.value);
      this.createWorkOrder(this.createOrderDispatcher.value, "Dispatcher", nav, false);
    }
    else {
      console.log(this.createOrderTDriver.value);
      this.createWorkOrder(this.createOrderTDriver.value, "Tractor Driver", nav, true);
    }
  }

  createWorkOrder(workOrder: any, role: string, nav: string, completeInfo: boolean): void {
    this.loadingSpinner.next(true)
    this.farmingService.createNewWorkOrder(workOrder, role, completeInfo)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.loadingSpinner.next(false)
            this.toast.presentToast("Work Order has been created successfully!", 'success');
            this.router.navigateByUrl(nav);
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
          this.loadingSpinner.next(false)
        },
      );
  }

  ///////////// Lists Methods //////////////////////

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
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createOrderDispatcher.patchValue({
        tractorDriverId: dispatcher.id
      });
    }
    else {
      this.createOrderTDriver.patchValue({
        machineryID: this.createOrderTDriver.get('machineryID').value,
        dispatcherId: dispatcher.id
      });
    }
    // clearing array
    this.allDispatchers = of([]);

    // For Specific Fields
    // this.fieldId = field.id;

    // passing name in select's input
    this.dispatcherInput.nativeElement.value = dispatcher.first_name + ' ' + dispatcher.last_name;

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
            console.log('customers:', customers.count);
            this.isDisabled = true;
            this.isFieldDisabled = true

            // clearing the input values in farm, crop after getting disabled
            this.farm_name = '';
            this.field_name = ''
            // this.crop_name = '';

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
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createOrderDispatcher.patchValue({
        customerId: customer.id,
        phone: customer.phone_number
      });
    }
    else {
      this.createOrderTDriver.patchValue({
        customerId: customer.id,
        phone: customer.phone_number
      });
    }
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
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createOrderDispatcher.patchValue({
        farmId: farm.id
      });
    } else {
      this.createOrderTDriver.patchValue({
        farmId: farm.id
      });
    }
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
            this.createOrderDispatcher.patchValue({
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

        this.createOrderDispatcher.patchValue({
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
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createOrderDispatcher.patchValue({
        fieldId: field.field_id,
        totalAcres: field.acres
      });

    } else {
      this.createOrderTDriver.patchValue({
        fieldId: field.field_id,
        totalAcres: field.acres
      });
    }

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
    if (localStorage.getItem('role').includes('Tractor Driver')) {
      this.createOrderTDriver.patchValue({
        machineryID: machinery.id,
        beginningEngineHours: machinery.odometer_reading_end
      });
    }
    console.log(machinery.odometer_reading_end);

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
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createOrderDispatcher.patchValue({
        service: service.service
      })
    }
    else {
      this.createOrderTDriver.patchValue({
        service: service.service
      });
    }
    // clearing array
    this.allServices = of([]);

    // For Specific Fields
    // this.fieldId = field.id;

    // passing name in select's input
    this.serviceInput.nativeElement.value = service.service;

    // to enable submit button
    this.isServiceSelected = false;
  }
  //#endregion
  disableFields() {
    this.isDisabled = true;
  }
}
