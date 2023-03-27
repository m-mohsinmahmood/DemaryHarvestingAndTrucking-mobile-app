import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TruckingService } from '../../trucking.service';
import * as moment from 'moment';
import { states } from 'src/JSON/state';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {
  @ViewChild('customerInput') customerInput: ElementRef;
  isCustomerSelected: any = true;
  customer_search$ = new Subject();
  customer_name: any = '';
  customerSearchValue: any;
  allCustomers: Observable<any>;
  customerUL: any = false;
  customerId: any;

  @ViewChild('tDriverInput') tDriverInput: ElementRef;
  istDriverSelected: any = true;
  tDriver_search$ = new Subject();
  tDriver_name: any = '';
  tDriverSearchValue: any;
  alltDrivers: Observable<any>;
  tDriverUL: any = false;

  @ViewChild('dispatcherInput') dispatcherInput: ElementRef;
  isDispatcherSelected: any = true;
  dispatcher_search$ = new Subject();
  dispatcher_name: any = '';
  dispatcherSearchValue: any;
  allDispatchers: Observable<any>;
  dispatcherUL: any = false;

  @ViewChild('machineryInput') machineryInput: ElementRef;
  isMachinerySelected: any = true;
  machinery_search$ = new Subject();
  machinery_name: any = '';
  machinerySearchValue: any;
  allMachinery: Observable<any>;
  machineryUL: any = false;

  isDisabled: any = true;

  @ViewChild('cropInput') cropInput: ElementRef;
  crop_search$ = new Subject();
  isCropSelected: any = true;
  cropUL: any = false;
  cropSearchValue: any;
  crop_name: any = '';
  allCrops: Observable<any>;

  role = '';
  createTicketFormDispatcherInHouse: FormGroup;
  createTicketFormTruckDriverInHouse: FormGroup;

  states: string[];


  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private truckingService: TruckingService,
    private renderer: Renderer2) {

    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.tDriverInput.nativeElement) {
          this.alltDrivers = of([]); // to clear array
          this.tDriverUL = false; // to hide the UL
        }
        if (e.target !== this.customerInput.nativeElement) {
          this.allCustomers = of([]); // to clear array
          this.customerUL = false; // to hide the UL
          this.isDisabled = this.createTicketFormDispatcherInHouse.controls['customerId'].value === '' ? true : false;
        }
        if (e.target !== this.cropInput.nativeElement) {
          this.allCrops = of([]); // to clear array
          this.cropUL = false; // to hide the UL
        }
      });
    }

    else if (localStorage.getItem('role').includes('Truck Driver')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.dispatcherInput.nativeElement) {
          this.allDispatchers = of([]); // to clear array
          this.dispatcherUL = false; // to hide the UL
        }
        if (e.target !== this.customerInput.nativeElement) {
          this.allCustomers = of([]); // to clear array
          this.customerUL = false; // to hide the UL
          this.isDisabled = this.createTicketFormDispatcherInHouse.controls['customerId'].value === '' ? true : false;
        }
        if (e.target !== this.machineryInput.nativeElement) {
          this.allMachinery = of([]); // to clear array
          this.machineryUL = false; // to hide the UL
        }
        if (e.target !== this.cropInput.nativeElement) {
          this.allCrops = of([]); // to clear array
          this.cropUL = false; // to hide the UL
        }
      });
    }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // pasing states
    this.states = states;

    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.customerSearchSubscription();
      this.tDriverSearchSubscription();
      this.cropSearchSubscription();
    } else {
      this.dispatcherSearchSubscription();
      this.customerSearchSubscription();
      this.machinerySearchSubscription();
      this.cropSearchSubscription();
    }

    this.initForms();
  }

  initForms() {
    this.createTicketFormDispatcherInHouse = this.formBuilder.group({
      dispatcherId: [localStorage.getItem('employeeId')],
      driverId: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      dispatcherNotes: [''],
      customerId: ['', [Validators.required]],
      cropId: ['', [Validators.required]]
    });

    this.createTicketFormTruckDriverInHouse = this.formBuilder.group({
      dispatcherId: ['', [Validators.required]],
      driverId: [localStorage.getItem('employeeId')],
      load: ['', [Validators.required]],
      loadDate: [moment().format("MM-DD-YYYY"), [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      truckNo: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      originBeginingOdometerReading: ['', [Validators.required]],
      destinationEndingnOdometerReading: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      deadHeadMiles: [''],
      totalJobMiles: [''],
      totalTripMiles: [''],
      truckDriverNotes: [''],
      cropId: ['', [Validators.required]]
    });
  }

  navigatedispatcher() {
    console.log(this.createTicketFormDispatcherInHouse.value);
    this.createTicketFormDispatcherInHouse.addControl('role', new FormControl('Dispatcher'));
    this.createTicketFormDispatcherInHouse.addControl('ticketStatus', new FormControl('sent'));
    this.createTicketFormDispatcherInHouse.addControl('truckingType', new FormControl('home'));
    this.createTicketFormDispatcherInHouse.addControl('isTicketInfoCompleted', new FormControl(false));

    var formData: FormData = new FormData();
    formData.append('traineeForm', JSON.stringify(this.createTicketFormDispatcherInHouse.value));

    this.truckingService.createNewDeliveryTicket(this.createTicketFormDispatcherInHouse.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.toast.presentToast("Delivery ticket has been created successfully!", 'success');
            this.router.navigateByUrl('/tabs/home/trucking/in-house');
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

  navigateTruckDriver() {
    console.log(this.createTicketFormTruckDriverInHouse.value);
    this.createTicketFormTruckDriverInHouse.addControl('role', new FormControl('Truck Driver'));
    this.createTicketFormTruckDriverInHouse.addControl('ticketStatus', new FormControl('sent'));
    this.createTicketFormTruckDriverInHouse.addControl('truckingType', new FormControl('home'));
    this.createTicketFormTruckDriverInHouse.addControl('isTicketInfoCompleted', new FormControl(true));

    var formData: FormData = new FormData();
    formData.append('traineeForm', JSON.stringify(this.createTicketFormTruckDriverInHouse.value));

    this.truckingService.createNewDeliveryTicket(formData)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.toast.presentToast("Delivery ticket has been created successfully!", 'success');
            this.router.navigateByUrl('/tabs/home/trucking/in-house');
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

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
        // for asterik to look required
        if (value === '') { this.isCustomerSelected = true; }

        this.allCustomers = this.truckingService.getCustomers(
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
    this.allCustomers = this.truckingService.getCustomers(
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
    // hiding UL
    this.customerUL = false;

    // assigning values in form
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createTicketFormDispatcherInHouse.patchValue({
        customerId: customer.id,
      });
    }
    else {
      this.createTicketFormTruckDriverInHouse.patchValue({
        customerId: customer.id,
      });
    }
    // passing name in select's input
    this.customerInput.nativeElement.value = customer.customer_name;

    // to enable submit button
    this.isCustomerSelected = false;

    // passing the customer id to  select farm & crop id
    this.customerId = customer.id;
    console.log(this.customer_name);
    console.log(this.customerId);

  }
  //#endregion

  //#region Truck Driver
  tDriverSearchSubscription() {
    this.tDriver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.istDriverSelected = true; }

        if (localStorage.getItem('role').includes('Dispatcher')) {
          this.alltDrivers = this.truckingService.getEmployees(
            value,
            'allEmployees',
            'Truck Driver'
          );
        }

        // subscribing to show/hide Field UL
        this.alltDrivers.subscribe((tDriver) => {
          if (tDriver.count === 0) {
            // hiding UL
            this.tDriverUL = false;
          } else {
            // showing UL
            this.tDriverUL = true;
          }
        });
      });
  }

  inputClickedtDriver() {
    // getting the serch value to check if there's a value in input
    this.tDriver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.tDriverSearchValue = v;
      });

    const value =
      this.tDriverSearchValue === undefined
        ? this.tDriver_name
        : this.tDriverSearchValue;

    // calling API
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.alltDrivers = this.truckingService.getEmployees(
        value,
        'allEmployees',
        'Truck Driver'
      );
    }

    // subscribing to show/hide farm UL
    this.alltDrivers.subscribe((tDriver) => {
      console.log(tDriver);

      if (tDriver.count === 0) {
        // hiding UL
        this.tDriverUL = false;
      } else {
        // showing UL
        this.tDriverUL = true;
      }
    });
  }
  listClickedtDriver(tDriver) {

    console.log(tDriver);

    // hiding UL
    this.tDriverUL = false;

    // assigning values in form
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createTicketFormDispatcherInHouse.patchValue({
        driverId: tDriver.id
      });
    }

    // clearing array
    this.alltDrivers = of([]);

    // passing name in select's input
    this.tDriverInput.nativeElement.value = tDriver.first_name;

    // to enable submit button
    this.istDriverSelected = false;
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

        if (localStorage.getItem('role').includes('Truck Driver')) {
          this.allDispatchers = this.truckingService.getEmployees(
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
    console.log(localStorage.getItem('role'));

    if (localStorage.getItem('role').includes('Truck Driver')) {
      this.allDispatchers = this.truckingService.getEmployees(
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
    if (localStorage.getItem('role').includes('Truck Driver')) {
      this.createTicketFormTruckDriverInHouse.patchValue({
        dispatcherId: dispatcher.id
      });
    }

    // clearing array
    this.allDispatchers = of([]);

    // passing name in select's input
    this.dispatcherInput.nativeElement.value = dispatcher.first_name;

    // to enable submit button
    this.isDispatcherSelected = false;
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
        this.allMachinery = this.truckingService.getTruck(
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
    this.allMachinery = this.truckingService.getTruck(
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
    this.createTicketFormTruckDriverInHouse.patchValue({
      truckNo: machinery.id,
    });
    // clearing array
    this.allMachinery = of([]);

    // For Specific Fields

    // passing name in select's input
    this.machineryInput.nativeElement.value = machinery.id;

    // to enable submit button
    this.isMachinerySelected = false;
  }
  //#endregion

  //  #region Crops
  cropSearchSubscription() {
    this.crop_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isCropSelected = true; }

        // calling API
        this.allCrops = this.truckingService.getCrops(value, 'customerCrops', this.customerId);


        // subscribing to show/hide crop UL
        this.allCrops.subscribe((crops) => {
          console.log('crops', crops);
          if (crops.count === 0) {
            // hiding UL
            this.cropUL = false;
          } else {
            // showing UL
            this.cropUL = true;
          }
        });
      });
  }

  inputClickedCrop() {
    // getting the serch value to check if there's a value in input
    this.crop_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.cropSearchValue = v;
      });

    const value =
      this.cropSearchValue === undefined
        ? this.crop_name
        : this.cropSearchValue;

    // calling API
    this.allCrops = this.truckingService.getCrops('', 'customerCrops', this.customerId);


    // subscribing to show/hide farm UL
    this.allCrops.subscribe((crops) => {
      if (crops.count === 0) {
        // hiding UL
        this.cropUL = false;
      } else {
        // showing UL
        this.cropUL = true;
      }
    });
  }

  listClickedCrop(crop) {
    // hiding UL
    this.cropUL = false;

    // passing name in select's input
    this.cropInput.nativeElement.value = crop.name;

    // to enable submit button
    this.isCropSelected = false;

    // assigning values in form
    if (this.role.includes('Dispatcher')) {
      this.createTicketFormDispatcherInHouse.patchValue({
        cropId: crop.crop_id
      });
    }
    else {
      this.createTicketFormTruckDriverInHouse.patchValue({
        cropId: crop.crop_id
      });
    }
    // clearing array
    this.allCrops = of([]);
  }
  //#endregion

  disableFields() {
    this.isDisabled = true;
  }
}
