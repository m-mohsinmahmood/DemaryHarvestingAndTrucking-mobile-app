/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, HostListener, OnInit,Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild('customerUL') private customerUL: ElementRef;
  @ViewChild('farmUL') private farmUL: ElementRef;
  @ViewChild('cropUL') private cropUL: ElementRef;


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
  farm_name: string;
  crop_name: any;

  farmID: any;
  customerID: any;

  isDisabled = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click',(e)=>{

      if(e.target !== this.customerInput.nativeElement){
        this.allCustomers = of([]);
        this.isDisabled = this.jobSetupForm.controls['customerName'].value === ''? true : false;
      }
      if(e.target !== this.farmInput.nativeElement){
        this.allFarmsClicked = of([]);
      }
      if(e.target !== this.cropInput.nativeElement){
        this.allCropsClicked = of([]);
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
      state: [''],
      customerName: [''],
      farmName: [''],
      // farm: ['',[Validators.required]],
      crop: [''],
      initailField: [''],

      // state: [''],
      // customer_id: [''],
      // farm_id: [''],
      // crop_id: [''],
      // initail_field: [''],
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

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers)=>{
          this.isDisabled = customers.count === 0? true: false;
        });
      });
  }

  inputClickedCustomer() {
    let value =  this.jobSetupForm.controls['customerName'].value === ''? '' : this.jobSetupForm.controls['customerName'].value;
    this.allCustomers = this.harvestingService.getCustomers(
      1,
      20,
      '',
      '',
      value,
      this.customerFiltersForm.value
    );

    // subscribing to disable & enable farm, crop inputs
    this.allCustomers.subscribe((e)=>{
      this.isDisabled = e.customers? false: true;
    });
  }
  listClickedCustomer(customer) {

    // clearing array
    this.allCustomers = of([]);

     // removing farm & crop name from select
     this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customerName: '',
      farmName: '',
      crop: '',
      initailField: '',
     });

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
    this.customerID = customer.id;

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
    // this.customerID = customer.id;

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
      });
  }

  inputClickedFarm() {
    this.allFarmsClicked = this.allFarms;
  }
  listClickedFarm(farm) {

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

      });
  }
  inputClickedCrop() {
    this.allCropsClicked = this.allCrops;

  }
  listClickedCrop(crop) {

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

    // clearing array
    this.allCrops = of([]);
    this.allCropsClicked = of([]);
  }
  //#endregion
}
