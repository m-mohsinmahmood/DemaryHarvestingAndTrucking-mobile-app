import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TruckingService } from '../../trucking.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {

  options: any;
  rateSheetImg: string[] = [];
  originDocs: string[] = [];
  customDocs: string[] = [];

  roleOptions = ['dispatcher', 'truck-driver'];
  role = this.roleOptions[1];
  createTicketFormDispatcher: FormGroup;
  createTicketFormTruckDriver: FormGroup;

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


  @ViewChild('rateInput') rateInput: ElementRef;
  isRateSelected: any = true;
  rate_search$ = new Subject();
  rate_name: any = '';
  rateSearchValue: any;
  allRates: Observable<any>;
  rateUL: any = false;

  isDisabled: any = true;

  ticketGeneratedDispatcher = {
    dispatcherId: [localStorage.getItem('employeeId')],
    customerId: '',
    uploadFile: [''],
    loadDate: '',
    driverId: '',
    load: '',
    rateType: '',
    cargo: '',
    originCity: '',
    destinationCity: '',
    destinationState: '',
    dispatcherNotes: '',
  }

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router,
    private truckingService: TruckingService,
    private renderer: Renderer2) {
    {
      if (localStorage.getItem('role') === 'dispatcher') {
        this.renderer.listen('window', 'click', (e) => {
          if (e.target !== this.tDriverInput.nativeElement) {
            this.alltDrivers = of([]); // to clear array
            this.tDriverUL = false; // to hide the UL
          }
          if (e.target !== this.customerInput.nativeElement) {
            this.allCustomers = of([]); // to clear array
            this.customerUL = false; // to hide the UL
          }
          if (e.target !== this.rateInput.nativeElement) {
            this.allRates = of([]); // to clear array
            this.rateUL = false; // to hide the UL
          }
        });
      }
    }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.customerSearchSubscription();
    this.tDriverSearchSubscription();
    this.rateSearchSubscription();

    this.createTicketFormDispatcher = this.formBuilder.group({
      dispatcherId: [localStorage.getItem('employeeId')],
      customerId: ['', [Validators.required]],
      uploadFile: ['', []],
      loadDate: ['', [Validators.required]],
      driverId: ['', [Validators.required]],
      load: ['', [Validators.required]],
      rateType: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      dispatcherNotes: ['', [Validators.required]],
    });

    this.createTicketFormTruckDriver = this.formBuilder.group({
      deliveryTicket: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      truckDriver: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      rateSheetUpload: ['', [Validators.required]],
      load: ['', [Validators.required]],
      rateType: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      truck: ['', [Validators.required]],
      ticket: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      originBeginingOdometerReading: ['', [Validators.required]],
      originEmptyWeight: ['', [Validators.required]],
      originLoadedWeight: ['', [Validators.required]],
      originWeightLoad1: ['', [Validators.required]],
      originalDocsUpload: ['', [Validators.required]],
      destinationEndingnOdometerReading: ['', [Validators.required]],
      destinationLoadedWeight: ['', [Validators.required]],
      destinationEmptyWeight: ['', [Validators.required]],
      originWeightLoad2: ['', [Validators.required]],
      weightLoad: ['', [Validators.required]],
      scaleTicket: ['', [Validators.required]],
      destinationDeliveryLoad: ['', [Validators.required]],
      documentsUpload: ['', [Validators.required]],
      driverNotes: ['', [Validators.required]],
    });
  }

  chooseImage(event) {
    if (event.target.name === 'rateSheet') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.rateSheetImg.push(URL.createObjectURL(event.target.files[i]));
      }
    }
    else if (event.target.name === 'originDocs') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.originDocs.push(URL.createObjectURL(event.target.files[i]));
      }
    }
    if (event.target.name === 'customDocs') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.customDocs.push(URL.createObjectURL(event.target.files[i]));
      }
    }
  }
  navigateDispatcher() {
    console.log(this.createTicketFormDispatcher.value);
    this.truckingService.createNewDeliveryTicket(this.createTicketFormDispatcher.value, 'dispatcher', 'commercial', 'sent')
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.ticketGeneratedDispatcher = {
              dispatcherId: [localStorage.getItem('employeeId')],
              customerId: this.customer_name,
              uploadFile: this.rateSheetImg,
              loadDate: this.createTicketFormDispatcher.get('loadDate').value,
              driverId: this.tDriver_name,
              load: this.createTicketFormDispatcher.get('loadDate').value,
              rateType: this.rate_name,
              cargo: this.createTicketFormDispatcher.get('cargo').value,
              originCity: this.createTicketFormDispatcher.get('originCity').value,
              destinationCity: this.createTicketFormDispatcher.get('destinationCity').value,
              destinationState: this.createTicketFormDispatcher.get('destinationState').value,
              dispatcherNotes: this.createTicketFormDispatcher.get('dispatcherNotes').value,
            }

            this.toast.presentToast("Delivery ticket has been created successfully!", 'success');
            this.router.navigate(['/tabs/home/trucking/commercial/create-ticket/ticket-generated', this.ticketGeneratedDispatcher]);
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }
  navigateTruckDriver() {
    console.log(this.createTicketFormTruckDriver.value);
    this.router.navigateByUrl('/tabs/home/trucking/commercial');
  }


  // Public Methods of Drop Down Lists

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
    // hiding UL
    this.customerUL = false;

    // assigning values in form
    if (localStorage.getItem('role') === 'dispatcher') {
      this.createTicketFormDispatcher.patchValue({
        customerId: customer.id,
      });
    }
    // else {
    //   this.createOrderTDriver.setValue({
    //     machineryID: this.createOrderTDriver.get('machineryID').value,
    //     cBeginningEngineHours: this.createOrderTDriver.get('cBeginningEngineHours').value,
    //     dispatcherId: this.createOrderTDriver.get('dispatcherId').value,
    //     customerId: customer.id,
    //     farmId: this.createOrderTDriver.get('farmId').value,
    //     fieldId: this.createOrderTDriver.get('fieldId').value,
    //     service: this.createOrderTDriver.get('service').value,
    //     tractorDriverId: this.createOrderTDriver.get('tractorDriverId').value,
    //     fieldAddress: this.createOrderTDriver.get('fieldAddress').value,
    //     phone: this.createOrderTDriver.get('phone').value
    //   });
    // }
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
      this.createTicketFormDispatcher.patchValue({
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

  //#region Rate
  rateSearchSubscription() {
    this.rate_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isRateSelected = true; }

        if (localStorage.getItem('role') === 'dispatcher') {
          this.allRates = this.truckingService.getTruckingRates(
            'allCustomersTruckingRate',
            this.customerId
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
        this.allRates.subscribe((rate) => {
          if (rate.count === 0) {
            // hiding UL
            this.rateUL = false;
          } else {
            // showing UL
            this.rateUL = true;
          }
        });
      });
  }

  inputClickedRate() {
    // getting the serch value to check if there's a value in input
    this.rate_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.rateSearchValue = v;
      });

    const value =
      this.rateSearchValue === undefined
        ? this.rate_name
        : this.rateSearchValue;

    // calling API
    if (localStorage.getItem('role') === 'dispatcher') {
      this.allRates = this.truckingService.getTruckingRates(
        'allCustomersTruckingRate',
        this.customerId
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
    this.allRates.subscribe((rate) => {
      console.log(rate);

      if (rate.count === 0) {
        // hiding UL
        this.rateUL = false;
      } else {
        // showing UL
        this.rateUL = true;
      }
    });
  }
  listClickedRate(rate) {

    console.log(rate);

    // hiding UL
    this.rateUL = false;

    // assigning values in form
    if (localStorage.getItem('role') === 'dispatcher') {
      this.createTicketFormDispatcher.patchValue({
        rateType: rate.id
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
    this.allRates = of([]);

    // passing name in select's input
    this.rate_name = rate.rate_type;

    // to enable submit button
    this.isRateSelected = false;
  }
  //#endregion

  disableFields() {
    this.isDisabled = true;
  }
}
