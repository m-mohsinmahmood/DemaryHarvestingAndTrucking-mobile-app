
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';
import { HarvestingService } from './../harvesting.service';
import { BehaviorSubject, Observable, of, Subject, } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-setup',
  templateUrl: './job-setup.page.html',
  styleUrls: ['./job-setup.page.scss'],
})
export class JobSetupPage implements OnInit {
  @ViewChild('customerInput') customerInput: ElementRef;
  @ViewChild('farmInput') farmInput: ElementRef;
  @ViewChild('cropInput') cropInput: ElementRef;
  @ViewChild('fieldInput') fieldInput: ElementRef;

  // form
  jobSetupForm: FormGroup;

  // observables
  allCustomers: Observable<any>;
  allFarms: Observable<any>;
  allFarmsClicked: Observable<any>;
  allCrops: Observable<any>;
  allCropsClicked: Observable<any>;
  allFields: Observable<any>;

  // subjects
  customer_search$ = new Subject();
  farm_search$ = new Subject();
  crop_search$ = new Subject();
  field_search$ = new Subject();

  // input values
  customer_name: any = '';
  farm_name: any = '';
  crop_name: any = '';
  field_name: any = '';

  // input's search values
  customerSearchValue: any = '';
  farmSearchValue: any = '';
  cropSearchValue: any = '';
  fieldSearchValue: any = '';

  // to show UL's
  customerUL: any = false;
  farmUL: any = false;
  cropUL: any = false;
  fieldUL: any = false;

  // for invalid
  isCustomerSelected: any = true;
  isFarmSelected: any = true;
  isCropSelected: any = true;
  isFieldSelected: any = true;

  // selected customer id to select farms & crops
  customerID: any;

  // selected farm id to select fields
  farmID: any;

  isDisabled: any = true;
  isFieldDisabled: any = true;

  states: string[];
  add_location_overlay = true;
  subscribe;
  loadingSub;
  customerData: any;

  public loadingSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private router: Router

  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.customerInput.nativeElement) {
        console.log('Customer', this.customerSearchValue);
        if (this.customerSearchValue === '') {
          this.isDisabled = true;
          this.farm_name = '';
          this.crop_name = '';
          this.customerUL = false; // to hide the UL
          this.isCustomerSelected = true;
          this.isFarmSelected = true;
          this.isCropSelected = true;
          this.isFieldDisabled = true;
          this.farmSearchValue = ''; // to disable field

        } else {
          this.isDisabled = false;
          this.allCustomers = of([]); // to clear array
          this.customerUL = false; // to hide the UL
        }
      }

      if (e.target !== this.farmInput.nativeElement) {
        console.log('Farm', this.farmSearchValue);
        // this.allFarmsClicked = of([]);
        // this.farmUL = false; // to hide the UL
        if (this.farmSearchValue === '' || this.farmSearchValue === undefined) {
          this.isFieldDisabled = true;
          this.field_name = '';
          this.farmUL = false;
        } else {
          this.isFieldDisabled = false;
          this.allFarms = of([]);
        }
      }
      if (e.target !== this.cropInput.nativeElement) {
        this.allCropsClicked = of([]);
        this.cropUL = false; // to hide the UL
      }
      if (e.target !== this.fieldInput.nativeElement) {
        // // console.log('Field');
        // this.allFields = of([]);
        // this.fieldUL = false; // to hide the UL
        if (this.fieldSearchValue === '' || this.farmSearchValue === undefined) {
          // this.createOrderDispatcher.patchValue({
          //   totalAcres: null
          // });
          this.allFields = of([]); // to clear array
          this.fieldUL = false; // to hide the UL

        } else {
          this.allFields = of([]); // to clear array
          this.fieldUL = false; // to hide the UL
        }
      }
    });
  }

  ngOnInit() {
    this.initForms();

    // pasing states
    this.states = states;
    this.initApis();
    this.initObservables();
    this.customerSearchSubscription();
    this.farmSearchSubscription();
    this.cropSearchSubscription();
    this.fieldSearchSubscription();
  }

  initApis() {
    // getting for crew-chief only
    this.harvestingService.getJobSetup('crew-chief', localStorage.getItem('employeeId'));
  }

  initObservables() {
    this.subscribe = this.harvestingService.customerJobSetup$.subscribe((res) => {
      console.log('Response',res);
      this.customerData = res;
    });

    this.loadingSub = this.harvestingService.customerLoading$.subscribe((val) => {
      // console.log('Loading Value',val);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.subscribe.unsubscribe();
    this.loadingSub.unsubscribe();
  }

  initForms() {
    this.jobSetupForm = this.formBuilder.group({
      crew_chief_id: [localStorage.getItem('employeeId')],
      state: ['', [Validators.required]],
      customer_id: [''],
      farm_id: [''],
      crop_id: [''],
      field_id: [''],
      is_close: [false],

    });
  }
  goBack() {
    this.location.back();
  }
  submit() {
    this.jobSetupForm.value.changeFarmFieldCrop = true;
    this.jobSetupForm.value.closeJob = true;
    this.jobSetupForm.value.newJobSetup = true;
    this.jobSetupForm.value.job_id = this.customerData?.customer_job[0].id;

    console.log("iddddddL: ",this.customerData?.customer_job[0].id);

    this.loadingSpinner.next(true);
    console.log(this.jobSetupForm.value);
    this.harvestingService.createJob(this.jobSetupForm.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);
            this.jobSetupForm.reset();
            this.isDisabled = true;
            this.customer_name = '';
            this.farm_name = '';
            this.crop_name = '';
            this.farm_name = '';
            this.field_name = '';
            this.toastService.presentToast(res.message, 'success');
            this.router.navigate(['/tabs/home/harvesting']);
            console.log(res.message);
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
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
        // passing for renderer2
        this.customerSearchValue = value;
        // for asterik to look required
        if (value === '') { this.isCustomerSelected = true; }


        this.allCustomers = this.harvestingService.getCustomers(value, 'allCustomers');
        // // showing UL
        // this.customerUL = true;

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers) => {
          // this.isDisabled = customers.count === 0 ? true : false;
          if (customers.count === 0) {
            this.isDisabled = true;
            this.isFieldDisabled = true


            // clearing the input values in farm, crop after getting disabled
            this.farm_name = '';
            this.crop_name = '';
            this.field_name = '';

            // hiding UL
            this.customerUL = false;
          } else {
            this.isDisabled = false;
            // showing UL
            this.customerUL = true;
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
    this.allCustomers = this.harvestingService.getCustomers('', 'allCustomers');

    // subscribing to disable & enable farm, crop inputs
    this.allCustomers.subscribe((customers) => {
      // this.isDisabled = customers.count === 0 ? true : false;
      if (customers.count === 0) {
        this.isDisabled = true;

        // clearing the input values in farm, crop after getting disabled
        this.farm_name = '';
        this.crop_name = '';
        this.field_name = '';

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
    console.log('Customer Object:', customer);

    // clearing array
    this.allCustomers = of([]);
    this.allFarms = of([]);
    this.allFarmsClicked = of([]);
    this.allCrops = of([]);
    this.allCropsClicked = of([]);

    // clearing value from farm & crop input
    this.farm_name = '';
    this.crop_name = '';

    // hiding UL
    this.customerUL = false;


    this.jobSetupForm.patchValue({
      customer_id: customer.id,
    });

    // passing name in select's input
    this.customerInput.nativeElement.value = customer.customer_name;


    // passing name in customer-search-value in Rendered2 for checks
    this.customerSearchValue = customer.customer_name;

    // to enable submit button
    this.isCustomerSelected = false;

    // passing the customer id to  select farm & crop id
    this.customerID = customer.id;
  }
  disableFields() {
    this.isDisabled = true;
  }
  //#endregion
  //  #region Farm
  farmSearchSubscription() {
    console.log('farmsubscription');
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

        //calling API
        this.allFarmsClicked = this.harvestingService.getFarms(value, 'customerFarms', this.customerID);


        // subscribing to show/hide farm UL
        this.allFarmsClicked.subscribe((farms) => {
          if (farms.count === 0) {
            this.isFieldDisabled = true;
            this.field_name = '';
            // hiding UL
            this.farmUL = false;
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
    this.allFarmsClicked = this.harvestingService.getFarms('', 'customerFarms', this.customerID);


    // subscribing to show/hide farm UL
    this.allFarmsClicked.subscribe((farms) => {
      console.log('Farms', farms);

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

    this.jobSetupForm.patchValue({
      farm_id: farm.id
    });

    // passing name in select's input
    this.farmInput.nativeElement.value = farm.name;

    // clearing array
    this.allFarms = of([]);
    this.allFarmsClicked = of([]);

    // passing name in farm-search-value in Rendered2 for checks 
    this.farmSearchValue = farm.name;

    // to enable submit button
    this.isFarmSelected = false;
    ;
    // passing selected Farm-ID for selected fields
    this.farmID = farm.id;
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
        this.allCropsClicked = this.harvestingService.getCrops(value, 'customerCrops', this.customerID);


        // subscribing to show/hide crop UL
        this.allCropsClicked.subscribe((crops) => {
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
    this.allCropsClicked = this.harvestingService.getCrops('', 'customerCrops', this.customerID);


    // subscribing to show/hide farm UL
    this.allCropsClicked.subscribe((crops) => {
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

    this.jobSetupForm.patchValue({
      crop_id: crop.crop_id
    });

    // clearing array
    this.allCrops = of([]);
    this.allCropsClicked = of([]);
  }
  //#endregion
  //#region Fields
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

        // calling API
        this.allFields = this.harvestingService.getFields(value, 'customerFields', this.customerID, this.farmID);

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
    this.allFields = this.harvestingService.getFields('', 'customerFields', this.customerID, this.farmID);

    // subscribing to show/hide field UL
    this.allFields.subscribe((fields) => {
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
    console.log('Field Object:', field);
    // hiding UL
    this.fieldUL = false;

    // passing name in select's input
    this.field_name = field.field_name;

    // passing name in customer-search-value in Rendered2 for checks 
    this.fieldInput.nativeElement.value = field.field_name;

    // to enable submit button
    this.isFieldSelected = false;

    // assigning values in form
    this.jobSetupForm.patchValue({
      field_id: field.field_id
    });

    // clearing array
    this.allFields = of([]);
  }
  //#endregion
}
