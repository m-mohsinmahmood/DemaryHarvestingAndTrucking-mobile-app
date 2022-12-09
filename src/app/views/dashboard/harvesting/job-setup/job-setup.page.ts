/* eslint-disable @typescript-eslint/dot-notation */
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
  jobSetupForm2: FormGroup;

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
  customer_name: any = '';
  farm_name:  any = '';
  crop_name:  any = '';

  farmID: any;
  customerID: any;

  isDisabled = true;

  // inputCustomer: any;

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
        this.isDisabled = this.jobSetupForm.controls['customer_id'].value === ''? true : false;
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
      // state: [''],
      // customerName: [''],
      // farmName: [''],
      // // farm: ['',[Validators.required]],
      // crop: [''],
      // initailField: [''],

      state: [''],
      customer_id: [''],
      farm_id: [''],
      crop_id: [''],
      initial_field: [''],
    });

    this.jobSetupForm2 = this.formBuilder.group({
      state: [''],
      customer_id: [''],
      farm_id: [''],
      crop_id: [''],
      initial_field: [''],
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

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers)=>{
          this.isDisabled = customers.count === 0? true: false;

          // clearing the input values in farm, crop
          // this.customer_name = '';
          this.farm_name = '';
          this.crop_name = '';
        });
      });
  }

  inputClickedCustomer() {

    const value =  this.customer_name === ''? '' : this.customer_name;
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
    console.log('Customer Object',customer);

    // clearing array
    this.allCustomers = of([]);
    this.allFarms = of([]);
    this.allFarmsClicked = of([]);
    this.allCrops = of([]);
    this.allCropsClicked= of([]);

    // clearing value from farm & crop input
    this.farm_name = '';
    this.crop_name = '';

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
    console.log('Customer From', this.jobSetupForm.value);

    // passing name in select's input
    this.customer_name = customer.customer_name;

    // calling the selected farm
    // this.allFarms = this.harvestingService.getCustomerFarm(customer.id);
    this.customerID = customer.id;

    // calling selected crop
    // this.allCrops = this.harvestingService.getCustomerCrops(
    //   customer.id,
    //   1,
    //   10,
    //   '',
    //   '',
    //   '',
    //   this.cropFiltersForm.value
    // );
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
    // this.allFarmsClicked = this.allFarms;
    const value =  this.farm_name === ''? '' : this.farm_name;
    this.allFarmsClicked = this.harvestingService.getCustomerFarm(
      this.customerID,
      1,
      20,
      '',
      '',
      value
    );
  }
  listClickedFarm(farm) {
    console.log('Farm Object',farm);
    // passing name in select's input
    this.farm_name = farm.name;

   // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: this.jobSetupForm.get('customer_id').value,
      farm_id: farm.id,
      crop_id: this.jobSetupForm.get('crop_id').value,
      initial_field: this.jobSetupForm.get('initial_field').value,
    });
    console.log('Farm Form',this.jobSetupForm.value);

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
    // this.allCropsClicked = this.allCrops;
    const value =  this.crop_name === ''? '' : this.crop_name;
    this.allCropsClicked = this.harvestingService.getCustomerCrops(
      this.customerID,
      1,
      20,
      '',
      '',
      value
    );

  }
  listClickedCrop(crop) {
    console.log('Crop Object',crop);

    // passing name in select's input
    this.crop_name = crop.crop_name;

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: this.jobSetupForm.get('customer_id').value,
      farm_id: this.jobSetupForm.get('farm_id').value,
      crop_id: crop.crop_id,
      initial_field: this.jobSetupForm.get('initial_field').value,
    });
    console.log('Crop Form',this.jobSetupForm.value);


    // clearing array
    this.allCrops = of([]);
    this.allCropsClicked = of([]);
  }
  //#endregion
}
