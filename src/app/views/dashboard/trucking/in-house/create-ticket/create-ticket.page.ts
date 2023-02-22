import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TruckingService } from '../../trucking.service';
import * as moment from 'moment';

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


  role = '';
  createTicketFormDispatcherInHouse: FormGroup;
  createTicketFormTruckDriverInHouse: FormGroup;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private truckingService: TruckingService,
    private renderer: Renderer2) {

    if (localStorage.getItem('role') === 'dispatcher') {
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
      });
    }

    else if (localStorage.getItem('role') === 'truck-driver') {
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
      });
    }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    if (localStorage.getItem('role') === 'dispatcher') {
      this.customerSearchSubscription();
      this.tDriverSearchSubscription();
    } else {
      this.dispatcherSearchSubscription();
      this.customerSearchSubscription();
      this.machinerySearchSubscription();
    }

    console.log(localStorage.getItem('employeeId'));

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
      truckDriverNotes: ['']
    });
  }

  navigatedispatcher() {
    console.log(this.createTicketFormDispatcherInHouse.value);

    this.truckingService.createNewDeliveryTicket(this.createTicketFormDispatcherInHouse.value, 'dispatcher', 'home', 'sent', false)
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

    this.truckingService.createNewDeliveryTicket(this.createTicketFormTruckDriverInHouse.value, 'truck-driver', 'home', 'sent', true)
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
    if (localStorage.getItem('role') === 'dispatcher') {
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
    this.customer_name = customer.customer_name;

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

        if (localStorage.getItem('role') === 'dispatcher') {
          this.alltDrivers = this.truckingService.getEmployees(
            value,
            'allEmployees',
            'Truck Driver'
          );
        }
        // else {
        //   this.allDispatchers = this.farmingService.getEmployees(
        //     value,
        //     'allEmployees',
        //     'Dispatcher'
        //   );
        // }

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
    if (localStorage.getItem('role') === 'dispatcher') {
      this.alltDrivers = this.truckingService.getEmployees(
        value,
        'allEmployees',
        'Truck Driver'
      );
    }
    // else {
    //   this.allDispatchers = this.farmingService.getEmployees(
    //     value,
    //     'allEmployees',
    //     'Dispatcher'
    //   );
    // }
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
    if (localStorage.getItem('role') === 'dispatcher') {
      this.createTicketFormDispatcherInHouse.patchValue({
        driverId: tDriver.id
      });
    }
    // else {
    //   this.createOrderTDriver.setValue({
    //     machineryID: this.createOrderTDriver.get('machineryID').value,
    //     cBeginningEngineHours: this.createOrderTDriver.get('cBeginningEngineHours').value,
    //     dispatcherId: dispatcher.id,
    //     customerId: this.createOrderTDriver.get('customerId').value,
    //     farmId: this.createOrderTDriver.get('farmId').value,
    //     fieldId: this.createOrderTDriver.get('fieldId').value,
    //     service: this.createOrderTDriver.get('service').value,
    //     tractorDriverId: this.createOrderTDriver.get('tractorDriverId').value,
    //     fieldAddress: this.createOrderTDriver.get('fieldAddress').value,
    //     phone: this.createOrderTDriver.get('phone').value
    //   });
    // }
    // clearing array
    this.alltDrivers = of([]);

    // passing name in select's input
    this.tDriver_name = tDriver.first_name;

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

        if (localStorage.getItem('role') === 'truck-driver') {
          this.allDispatchers = this.truckingService.getEmployees(
            value,
            'allEmployees',
            'Dispatcher'
          );
        }
        // else {
        //   this.allDispatchers = this.farmingService.getEmployees(
        //     value,
        //     'allEmployees',
        //     'Dispatcher'
        //   );
        // }

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

    if (localStorage.getItem('role') === 'truck-driver') {
      this.allDispatchers = this.truckingService.getEmployees(
        value,
        'allEmployees',
        'Dispatcher'
      );
    }
    // else {
    //   this.allDispatchers = this.farmingService.getEmployees(
    //     value,
    //     'allEmployees',
    //     'Dispatcher'
    //   );
    // }
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
    if (localStorage.getItem('role') === 'truck-driver') {
      this.createTicketFormTruckDriverInHouse.patchValue({
        dispatcherId: dispatcher.id
      });
    }
    // else {
    //   this.createOrderTDriver.setValue({
    //     machineryID: this.createOrderTDriver.get('machineryID').value,
    //     cBeginningEngineHours: this.createOrderTDriver.get('cBeginningEngineHours').value,
    //     dispatcherId: dispatcher.id,
    //     customerId: this.createOrderTDriver.get('customerId').value,
    //     farmId: this.createOrderTDriver.get('farmId').value,
    //     fieldId: this.createOrderTDriver.get('fieldId').value,
    //     service: this.createOrderTDriver.get('service').value,
    //     tractorDriverId: this.createOrderTDriver.get('tractorDriverId').value,
    //     fieldAddress: this.createOrderTDriver.get('fieldAddress').value,
    //     phone: this.createOrderTDriver.get('phone').value
    //   });
    // }
    // clearing array
    this.allDispatchers = of([]);

    // passing name in select's input
    this.dispatcher_name = dispatcher.first_name;

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
    this.machinery_name = machinery.id;

    // to enable submit button
    this.isMachinerySelected = false;
  }
  //#endregion
  disableFields() {
    this.isDisabled = true;
  }
}
