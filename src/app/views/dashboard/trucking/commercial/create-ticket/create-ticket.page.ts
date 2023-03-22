/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { states } from 'src/JSON/state';
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

  role;
  createTicketFormDispatcher: FormGroup;
  createTicketFormTruckDriver: FormGroup;

  @ViewChild('dispatcherInput') dispatcherInput: ElementRef;
  isDispatcherSelected: any = true;
  dispatcher_search$ = new Subject();
  dispatcher_name: any = '';
  dispatcherSearchValue: any;
  allDispatchers: Observable<any>;
  dispatcherUL: any = false;

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

  @ViewChild('machineryInput') machineryInput: ElementRef;
  isMachinerySelected: any = true;
  machinery_search$ = new Subject();
  machinery_name: any = '';
  machinerySearchValue: any;
  allMachinery: Observable<any>;
  machineryUL: any = false;

  @ViewChild('cropInput') cropInput: ElementRef;
  crop_search$ = new Subject();
  isCropSelected: any = true;
  cropUL: any = false;
  cropSearchValue: any;
  crop_name: any = '';
  allCrops: Observable<any>;

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
  };

  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  weightupload_1 = false;
  weightupload_2 = false;
  weightupload_3 = false;
  loadupload_1 = false;
  loadupload_2 = false;

  states: string[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private router: Router,
    private truckingService: TruckingService,
    private renderer: Renderer2
  ) {
    {
      if (localStorage.getItem('role').includes('Dispatcher')) {
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
          if (e.target !== this.cropInput.nativeElement) {
            this.allCrops = of([]); // to clear array
            this.cropUL = false; // to hide the UL
          }
        });
      } else {
        this.renderer.listen('window', 'click', (e) => {
          if (e.target !== this.dispatcherInput.nativeElement) {
            this.allDispatchers = of([]); // to clear array
            this.dispatcherUL = false; // to hide the UL
          }
          if (e.target !== this.customerInput.nativeElement) {
            this.allCustomers = of([]); // to clear array
            this.customerUL = false; // to hide the UL
          }
          if (e.target !== this.rateInput.nativeElement) {
            this.allRates = of([]); // to clear array
            this.rateUL = false; // to hide the UL
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
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // pasing states
    this.states = states;

    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.customerSearchSubscription();
      this.tDriverSearchSubscription();
      this.rateSearchSubscription();
      this.cropSearchSubscription();
    }
    else {
      this.dispatcherSearchSubscription();
      this.customerSearchSubscription();
      this.rateSearchSubscription();
      this.machinerySearchSubscription();
      this.cropSearchSubscription();
    }

    this.createTicketFormDispatcher = this.formBuilder.group({
      dispatcherId: [localStorage.getItem('employeeId')],
      customerId: ['', [Validators.required]],
      uploadFile: ['', []],
      loadDate: [moment().format('MM-DD-YYYY'), [Validators.required]],
      driverId: ['', [Validators.required]],
      load: ['', [Validators.required]],
      rateType: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      dispatcherNotes: ['', [Validators.required]],
      image_1: [''],
      image_2: [''],
      image_3: [''],
      role: [''],
      truckingType: [''],
      ticketStatus: [''],
      isTicketInfoCompleted: [''],
      cropId: ['', [Validators.required]]
    });

    this.createTicketFormTruckDriver = this.formBuilder.group({
      dispatcherId: ['', [Validators.required]],
      loadDate: [moment().format('MM-DD-YYYY'), [Validators.required]],
      driverId: [[localStorage.getItem('employeeId')]],
      customerId: ['', [Validators.required]],
      rateSheetUpload: ['', [Validators.required]],
      load: ['', [Validators.required]],
      rateType: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      truckNo: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      originBeginingOdometerReading: ['', [Validators.required]],
      originEmptyWeight: ['', [Validators.required]],
      originLoadedWeight: ['', [Validators.required]],
      originWeightLoad: ['', [Validators.required]],
      originalDocsUpload: ['', [Validators.required]],
      destinationEndingnOdometerReading: ['', [Validators.required]],
      destinationLoadedWeight: ['', [Validators.required]],
      destinationEmptyWeight: ['', [Validators.required]],
      weightLoad: ['', [Validators.required]],
      scaleTicket: ['', [Validators.required]],
      destinationDeliveryLoad: ['', [Validators.required]],
      documentsUpload: ['', [Validators.required]],
      truckDriverNotes: ['', [Validators.required]],
      deadHeadMiles: ['', [Validators.required]],
      totalJobMiles: ['', [Validators.required]],
      totalTripMiles: ['', [Validators.required]],
      hoursWorked: ['20'],
      image_1: [''],
      image_2: [''],
      image_3: [''],
      weightimages_1: [''],
      weightimages_2: [''],
      weightimages_3: [''],
      loadimages_1: [''],
      loadimages_2: [''],
      role: [''],
      truckingType: [''],
      ticketStatus: [''],
      isTicketInfoCompleted: [''],
      cropId: ['', [Validators.required]]
    });
  }

  // chooseImage(event) {
  //   if (event.target.name === 'rateSheet') {
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       this.rateSheetImg.push(URL.createObjectURL(event.target.files[i]));
  //     }
  //   } else if (event.target.name === 'originDocs') {
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       this.originDocs.push(URL.createObjectURL(event.target.files[i]));
  //     }
  //   }
  //   if (event.target.name === 'customDocs') {
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       this.customDocs.push(URL.createObjectURL(event.target.files[i]));
  //     }
  //   }
  // }
  onSelectedFiles(file, name) {
    if (this.role.includes('Dispatcher')) {
      if (name === 'upload_1') {
        this.upload_1 = !this.upload_1;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormDispatcher.controls.image_1?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
      if (name === 'upload_2') {
        this.upload_2 = !this.upload_2;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormDispatcher.controls.image_2?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
      if (name === 'upload_3') {
        this.upload_3 = !this.upload_3;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormDispatcher.controls.image_3?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
    }
    // for truck driver
    else {
      if (name === 'upload_1') {
        this.upload_1 = !this.upload_1;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormTruckDriver.controls.image_1?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
      if (name === 'upload_2') {
        this.upload_2 = !this.upload_2;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormTruckDriver.controls.image_2?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
      if (name === 'upload_3') {
        this.upload_3 = !this.upload_3;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormTruckDriver.controls.image_3?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
      if (name === 'weightupload_1') {
        this.weightupload_1 = !this.weightupload_1;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormTruckDriver.controls.weightimages_1?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
      if (name === 'weightupload_2') {
        this.weightupload_2 = !this.weightupload_2;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormTruckDriver.controls.weightimages_2?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
      if (name === 'weightupload_3') {
        this.weightupload_3 = !this.weightupload_3;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormTruckDriver.controls.weightimages_3?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
      if (name === 'loadupload_1') {
        this.loadupload_1 = !this.loadupload_1;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormTruckDriver.controls.loadimages_1?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }

      if (name === 'loadupload_2') {
        this.loadupload_2 = !this.loadupload_2;
        if (file.target.files && file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.createTicketFormTruckDriver.controls.loadimages_2?.setValue(
              file.target.files[0]
            );
          };
          reader.readAsDataURL(file.target.files[0]);
        } else {
        }
      }
    }
  }
  navigateDispatcher() {
    console.log('---', this.createTicketFormDispatcher.value);

    // patching
    this.createTicketFormDispatcher.patchValue({
      role: 'Dispatcher',
      truckingType: 'commercial',
      ticketStatus: 'sent',
      isTicketInfoCompleted: 'false',
    });

    // Form Data
    var formData: FormData = new FormData();
    formData.append(
      'traineeForm',
      JSON.stringify(this.createTicketFormDispatcher.value)
    );
    formData.append(
      'image_1',
      this.createTicketFormDispatcher.get('image_1').value
    );
    formData.append(
      'image_2',
      this.createTicketFormDispatcher.get('image_2').value
    );
    formData.append(
      'image_3',
      this.createTicketFormDispatcher.get('image_3').value
    );

    this.truckingService.createNewDeliveryTicketCommercial(formData).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === 200) {
          this.ticketGeneratedDispatcher = {
            dispatcherId: [localStorage.getItem('employeeId')],
            customerId: this.customer_name,
            uploadFile: this.rateSheetImg,
            loadDate: this.createTicketFormDispatcher.get('loadDate').value,
            driverId: this.tDriver_name,
            load: this.createTicketFormDispatcher.get('load').value,
            rateType: this.rate_name,
            cargo: this.createTicketFormDispatcher.get('cargo').value,
            originCity: this.createTicketFormDispatcher.get('originCity').value,
            destinationCity:
              this.createTicketFormDispatcher.get('destinationCity').value,
            destinationState:
              this.createTicketFormDispatcher.get('destinationState').value,
            dispatcherNotes:
              this.createTicketFormDispatcher.get('dispatcherNotes').value,
          };

          this.toast.presentToast(
            'Delivery ticket has been created successfully!',
            'success'
          );
          this.router.navigate([
            '/tabs/home/trucking/commercial/create-ticket/ticket-generated', {
              id: res.id.record_id,
            }
          ]);
        }
      },
      (err) => {
        this.toast.presentToast(err, 'danger');
      }
    );
  }
  navigateTruckDriver() {
    // patching
    this.createTicketFormTruckDriver.patchValue({
      role: 'Truck Driver',
      truckingType: 'commercial',
      ticketStatus: 'sent',
      isTicketInfoCompleted: true,
    });

    // // Form Data
    var formData: FormData = new FormData();
    formData.append(
      'createTicketFormTruckDriver',
      JSON.stringify(this.createTicketFormTruckDriver.value)
    );
    formData.append(
      'image_1',
      this.createTicketFormTruckDriver.get('image_1').value
    );
    formData.append(
      'image_2',
      this.createTicketFormTruckDriver.get('image_2').value
    );
    formData.append(
      'image_3',
      this.createTicketFormTruckDriver.get('image_3').value
    );
    formData.append(
      'weightimages_1',
      this.createTicketFormTruckDriver.get('weightimages_1').value
    );
    formData.append(
      'weightimages_2',
      this.createTicketFormTruckDriver.get('weightimages_2').value
    );
    formData.append(
      'weightimages_3',
      this.createTicketFormTruckDriver.get('weightimages_3').value
    );
    formData.append(
      'loadimages_1',
      this.createTicketFormTruckDriver.get('loadimages_1').value
    );
    formData.append(
      'loadimages_2',
      this.createTicketFormTruckDriver.get('loadimages_2').value
    );

    this.truckingService.createNewDeliveryTicketCommercial(formData).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === 200) {
          this.toast.presentToast(
            'Delivery ticket has been created successfully!',
            'success'
          );
          this.router.navigateByUrl('/tabs/home/trucking/commercial');
        }
      },
      (err) => {
        this.toast.presentToast(err, 'danger');
      }
    );
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
        if (value === '') {
          this.isCustomerSelected = true;
        }

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
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createTicketFormDispatcher.patchValue({
        customerId: customer.id,
      });
    } else {
      this.createTicketFormTruckDriver.patchValue({
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
        if (value === '') {
          this.istDriverSelected = true;
        }

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
      this.createTicketFormDispatcher.patchValue({
        driverId: tDriver.id,
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
    this.tDriverInput.nativeElement.value = tDriver.first_name;

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
        if (value === '') {
          this.isRateSelected = true;
        }

        this.allRates = this.truckingService.getTruckingRates(
          'allCustomersTruckingRate',
          this.customerId
        );


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
    this.allRates = this.truckingService.getTruckingRates(
      'allCustomersTruckingRate',
      this.customerId
    );

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
    if (localStorage.getItem('role').includes('Dispatcher')) {
      this.createTicketFormDispatcher.patchValue({
        rateType: rate.id,
      });
    } else {
      this.createTicketFormTruckDriver.patchValue({
        rateType: rate.id,
      });
    }
    // clearing array
    this.allRates = of([]);

    // passing name in select's input
    this.rateInput.nativeElement.value = rate.rate_type;

    // to enable submit button
    this.isRateSelected = false;
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
        if (value === '') {
          this.isDispatcherSelected = true;
        }

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
      this.createTicketFormTruckDriver.patchValue({
        dispatcherId: dispatcher.id,
      });
    }

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
        if (value === '') {
          this.isMachinerySelected = true;
        }
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
    this.createTicketFormTruckDriver.patchValue({
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
      this.createTicketFormDispatcher.patchValue({
        cropId: crop.crop_id
      });
    }
    else {
      this.createTicketFormTruckDriver.patchValue({
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
