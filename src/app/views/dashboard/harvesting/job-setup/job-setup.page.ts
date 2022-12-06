/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
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
  jobSetupForm: FormGroup;
  customerFiltersForm: FormGroup;
  cropFiltersForm: FormGroup;
  states: string[];
  allCustomers: Observable<any>;
  allFarms: Observable<any>;
  allFarmsClicked: Observable<any>;
  allCrops: Observable<any>;
  allCropsClicked: Observable<any>;
  customer_search$ = new Subject();
  farm_search$ = new Subject();
  crop_search$ = new Subject();
  search_location_text = '';
  selectedCity: any;
  placeholderText = 'Select Customer';
  add_location_overlay = true;
  customer_name: any;
  farm_name: any;
  crop_name: any;

  farmID: any;
  customerID: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService
  ) {}

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
      customerName: [''],
      farmName: ['', []],
      // farm: ['',[Validators.required]],
      crop: ['', [Validators.required]],
      initailField: ['', [Validators.required]],
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
  }
  //  #region Customer
  customerSearchSubscription() {
    console.log('customerSearchSubscription :)');
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
      });
  }

  inputClickedCustomer() {
    this.allCustomers = this.harvestingService.getCustomers();
    // clearing farm array
    this.allFarms = of([]);
  }
  listClickedCustomer(customer) {
    // clearing array
    this.allCustomers = of([]);

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customerName: customer.customer_name,
      farmName: this.jobSetupForm.get('farmName').value,
      crop: this.jobSetupForm.get('crop').value,
      initailField: this.jobSetupForm.get('initailField').value,
    });
    // passing name in select's input
    this.customer_name = customer.customer_name;

    // calling the selected farm
    this.allFarms = this.harvestingService.getCustomerFarm(customer.id);
    this.farmID = customer.id;

    // calling selected crop
    this.allCrops = this.harvestingService.getCustomerCrops(
      customer.id,
      1,
      10,
      '',
      '',
      '',
      this.cropFiltersForm.value
    );
    this.customerID = customer.id;
  }
  //#endregion

  //  #region Farm
  farmSearchSubscription() {
    console.log('FarmSearchSubscription :)');
    this.farm_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        this.allFarmsClicked = this.harvestingService.getCustomerFarm(
          this.farmID,
          1,
          10,
          '',
          '',
          value
        );
      });
  }

  inputClickedFarm() {
    this.allFarmsClicked = this.allFarms;
  }
  listClickedFarm(farm) {
    console.log('Farm Object:', farm);

    // passing name in select's input
    this.farm_name = farm.name;

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customerName: this.jobSetupForm.get('customerName').value,
      farmName: farm.name,
      crop: this.jobSetupForm.get('crop').value,
      initailField: this.jobSetupForm.get('initailField').value,
    });
    // clearing array
    this.allFarms = of([]);
    this.allFarmsClicked = of([]);

  }
  //#endregion

  //#region Crops

  cropSearchSubscription() {
    console.log('CropSearchSubscription :)');
    this.crop_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        console.log('first',value);
        this.allCropsClicked = this.harvestingService.getCustomerCrops(
          this.customerID,
          1,
          10,
          '',
          '',
          value
        );
      });
  }
  inputClickedCrop() {
    this.allCropsClicked = this.allCrops;

  }
  listClickedCrop(crop) {
    console.log('Crop Object:', crop);

    // passing name in select's input
    this.crop_name = crop.crop_name;

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customerName: this.jobSetupForm.get('customerName').value,
      farmName: this.jobSetupForm.get('farmName').value,
      crop: crop.crop_name,
      initailField: this.jobSetupForm.get('initailField').value,
    });
console.log(this.jobSetupForm.value)
    // clearing array
    this.allCrops = of([]);
    this.allCropsClicked = of([]);
  }
  //#endregion
}
