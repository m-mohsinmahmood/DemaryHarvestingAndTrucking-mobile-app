/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';
import { HarvestingService } from './../harvesting.service';
import { Observable, of, Subject, } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-job-setup',
  templateUrl: './job-setup.page.html',
  styleUrls: ['./job-setup.page.scss'],
})
export class JobSetupPage implements OnInit {
  @ViewChild('customerInput') customerInput: ElementRef;
  @ViewChild('farmInput') farmInput: ElementRef;
  @ViewChild('cropInput') cropInput: ElementRef;

  // form
  jobSetupForm: FormGroup;

  // filters form
  customerFiltersForm: FormGroup;
  cropFiltersForm: FormGroup;

  // observables
  allCustomers: Observable<any>;
  allFarms: Observable<any>;
  allFarmsClicked: Observable<any>;
  allCrops: Observable<any>;
  allCropsClicked: Observable<any>;

  // subjects
  customer_search$ = new Subject();
  farm_search$ = new Subject();
  crop_search$ = new Subject();

  // input values
  customer_name: any = '';
  farm_name: any = '';
  crop_name: any = '';

  // input's search values
  customerSearchValue: any;
  farmSearchValue: any;
  cropSearchValue: any;

  // to show UL's
  customerUL: any = false;
  farmUL: any = false;
  cropUL: any = false;

  // for invalid
  isCustomerSelected: any = true;
  isFarmSelected: any = true;
  isCropSelected: any = true;

// selected customer id to select farms & crops
  customerID: any;

  isDisabled: any = true;
  states: string[];
  add_location_overlay = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.customerInput.nativeElement) {
        this.isDisabled =
          this.jobSetupForm.controls['customer_id'].value === '' ? true : false;
        this.allCustomers = of([]); // to clear array
        this.customerUL = false; // to hide the UL
      }

      if (e.target !== this.farmInput.nativeElement) {
        this.allFarmsClicked = of([]);
        this.farmUL = false; // to hide the UL
      }
      if (e.target !== this.cropInput.nativeElement) {
        this.allCropsClicked = of([]);
        this.cropUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    this.initForms();

    // pasing states
    this.states = states;

    this.customerSearchSubscription();
    this.farmSearchSubscription();
    this.cropSearchSubscription();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  initForms() {
    this.jobSetupForm = this.formBuilder.group({
      state: ['', [Validators.required]],
      customer_id: [''],
      farm_id: [''],
      crop_id: [''],
      initial_field: ['', [Validators.required]],
    });

    this.customerFiltersForm = this.formBuilder.group({
      type: [''],
      status: [''],
    });

    this.cropFiltersForm = this.formBuilder.group({
      status: [''],
      calendar_year: [''],
    });
  }
  goBack() {
    this.location.back();
  }
  submit() {
    console.log(this.jobSetupForm.value);
    // this.harvestingService.createJob(this.jobSetupForm.value);
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
        this.allCustomers = this.harvestingService.getCustomers(
          1,
          10,
          '',
          '',
          value,
          this.customerFiltersForm.value
        );
        // showing UL
        this.customerUL = true;

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers) => {
          this.isDisabled = customers.count === 0 ? true : false;
          if (customers.count === 0) {
            this.isDisabled = true;

            // clearing the input values in farm, crop after getting disabled
            this.farm_name = '';
            this.crop_name = '';

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
    console.log(this.customerSearchValue);
    console.log(this.customer_name);
    const value =
      this.customerSearchValue === undefined
        ? this.customer_name
        : this.customerSearchValue;

    // calling API
    this.allCustomers = this.harvestingService.getCustomers(
      1,
      20,
      '',
      '',
      value,
      this.customerFiltersForm.value
    );

    // subscribing to disable & enable farm, crop inputs
    this.allCustomers.subscribe((customers) => {
      this.isDisabled = customers.count === 0 ? true : false;
      if (customers.count === 0) {
        this.isDisabled = true;

        // clearing the input values in farm, crop after getting disabled
        this.farm_name = '';
        this.crop_name = '';

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
    this.allFarms = of([]);
    this.allFarmsClicked = of([]);
    this.allCrops = of([]);
    this.allCropsClicked = of([]);

    // clearing value from farm & crop input
    this.farm_name = '';
    this.crop_name = '';

    // hiding UL
    this.customerUL = false;

    // removing farm & crop name from select
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: '',
      farm_id: '',
      crop_id: '',
      initial_field: '',
    });

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: customer.id,
      farm_id: this.jobSetupForm.get('farm_id').value,
      crop_id: this.jobSetupForm.get('crop_id').value,
      initial_field: this.jobSetupForm.get('initial_field').value,
    });

    // passing name in select's input
    this.customer_name = customer.customer_name;

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
    this.farm_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        this.allFarmsClicked = this.harvestingService.getCustomerFarm(
          this.customerID,
          1,
          20,
          '',
          '',
          value
        );

        // subscribing to show/hide farm UL
        this.allFarmsClicked.subscribe((farms) => {
          if (farms.count === 0) {
            // hiding UL
            this.farmUL = false;
          } else {
            // showing UL
            this.farmUL = true;
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
    this.allFarmsClicked = this.harvestingService.getCustomerFarm(
      this.customerID,
      1,
      20,
      '',
      '',
      value
    );

    // subscribing to show/hide farm UL
    this.allFarmsClicked.subscribe((farms) => {
      if (farms.count === 0) {
        // hiding UL
        this.farmUL = false;
      } else {
        // showing UL
        this.farmUL = true;
      }
    });
  }
  listClickedFarm(farm) {
    // hiding UL
    this.farmUL = false;

    // passing name in select's input
    this.farm_name = farm.name;

    // to enable submit button
    this.isFarmSelected = false;

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: this.jobSetupForm.get('customer_id').value,
      farm_id: farm.id,
      crop_id: this.jobSetupForm.get('crop_id').value,
      initial_field: this.jobSetupForm.get('initial_field').value,
    });

    // clearing array
    this.allFarms = of([]);
    this.allFarmsClicked = of([]);
  }
  //#endregion
  //#region Crops
  cropSearchSubscription() {
    this.crop_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        this.allCropsClicked = this.harvestingService.getCustomerCrops(
          this.customerID,
          1,
          20,
          '',
          '',
          value
        );

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
    this.allCropsClicked = this.harvestingService.getCustomerCrops(
      this.customerID,
      1,
      20,
      '',
      '',
      value
    );

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
    this.crop_name = crop.crop_name;

    // to enable submit button
    this.isCropSelected = false;

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: this.jobSetupForm.get('customer_id').value,
      farm_id: this.jobSetupForm.get('farm_id').value,
      crop_id: crop.crop_id,
      initial_field: this.jobSetupForm.get('initial_field').value,
    });

    // clearing array
    this.allCrops = of([]);
    this.allCropsClicked = of([]);
  }
  //#endregion
}
