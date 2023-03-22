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
  selector: 'app-change-farm',
  templateUrl: './change-farm.page.html',
  styleUrls: ['./change-farm.page.scss'],
})

export class ChangeFarmPage implements OnInit {
  @ViewChild('customerInput') customerInput: ElementRef;
  @ViewChild('farmInput') farmInput: ElementRef;
  @ViewChild('cropInput') cropInput: ElementRef;
  @ViewChild('fieldInput') fieldInput: ElementRef;

  // form
  jobSetupForm: FormGroup;
  jobUpdateForm: FormGroup;

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
  isFarmCropSelected: any = true;

  // selected customer id to select farms & crops
  customerID: any;

  // selected farm id to select fields
  farmID: any;

  isDisabled: any = true;
  isFieldDisabled: any = true;

  states: string[];
  add_location_overlay = true;

  customerData: any;

  data;

  subscribe;
  loadingSub;

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

    this.farmSearchSubscription();
    this.cropSearchSubscription();
    this.fieldSearchSubscription();
    this.initApis();
    this.initObservables();
  }

  ngOnDestroy(): void {
    this.DataDestroy();
  }

  async ionViewDidLeave() {
    this.DataDestroy();
  }

  DataDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.subscribe.unsubscribe();
    this.loadingSub.unsubscribe();
  }

  initForms() {
    this.jobSetupForm = this.formBuilder.group({
      // crew_chief_id: [localStorage.getItem('employeeId')],
      jobId: [''],
      state: ['', [Validators.required]],
      customer_id: [''],
      farm_id: [''],
      crop_id: [''],
      field_id: [''],
    });
    this.jobUpdateForm = this.formBuilder.group({
      job_id: [''],
      crew_chief_id: [localStorage.getItem('employeeId')],
      state: ['', [Validators.required]],
      customer_id: [''],
      farm_id: [''],
      crop_id: [''],
      field_id: [''],
    });
  }

  initApis() {
    // getting for crew Chief only
    this.harvestingService.getJobSetup('Crew Chief', localStorage.getItem('employeeId'));
  }

  initObservables() {
    this.subscribe = this.harvestingService.customerJobSetup$.subscribe((res) => {
      // console.log('Response',res);
      this.customerData = res;
      // console.log(this.customerData?.customer_job[0]);

      // passing values
      this.jobSetupForm.patchValue({
        jobId: this.customerData?.customer_job[0].id,
        state: this.customerData?.customer_job[0].state,
        customer_id: this.customerData?.customer_job[0].customer_id,
        farm_id: this.customerData?.customer_job[0].farm_id,
        crop_id: this.customerData?.customer_job[0].crop_id,
        field_id: this.customerData?.customer_job[0].field_id,
      });

      // passing customer & field name's
      this.customer_name = this.customerData?.customer_job[0].customer_name;
      this.field_name = this.customerData?.customer_job[0].field_name;
      this.farm_name = this.customerData?.customer_job[0].farm_name;
      this.crop_name = this.customerData?.customer_job[0].crop;

      //passing customerid for farm & crop
      this.customerID = this.customerData?.customer_job[0].customer_id;

    });

    this.loadingSub = this.harvestingService.customerLoading$.subscribe((val) => {
      // console.log('Loading Value',val);
    });
  }

  goBack() {
    this.location.back();
  }
  submit() {
    console.log(this.jobUpdateForm.value);
    // passing crop & farm id
    this.jobUpdateForm.patchValue({
      customer_id: this.jobSetupForm.get('customer_id').value,
      farm_id: this.jobSetupForm.get('farm_id').value,
      crop_id: this.jobSetupForm.get('crop_id').value,
      field_id: this.jobSetupForm.get('field_id').value,
      state: this.jobSetupForm.get('state').value,
    });

    this.jobUpdateForm.value.changeFarmFieldCrop = true;
    this.jobUpdateForm.value.closeJob = true;
    this.jobUpdateForm.value.newJobSetup = true;
    this.jobUpdateForm.value.job_id = this.jobSetupForm.get('jobId').value;

    console.log(this.jobUpdateForm.value);

    this.loadingSpinner.next(true);
    this.harvestingService.createJob(this.jobUpdateForm.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);
            this.toastService.presentToast(res.message, 'success');
            this.router.navigate(['/tabs/home/harvesting']);

            console.log(res.message);
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          // this.handleError(err);
        },
      );
  }

  //  #region Farm
  farmSearchSubscription() {
    this.farm_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isFarmCropSelected = true; }

        //calling API
        this.allFarmsClicked = this.harvestingService.getFarms(value, 'customerFarms', this.customerData?.customer_job[0].customer_id);


        // subscribing to show/hide farm UL
        this.allFarmsClicked.subscribe((farms) => {
          if (farms.count === 0) {
            this.isFieldDisabled = true;
            // hiding UL
            this.farmUL = false;
            // disbale button
            this.isFarmCropSelected = true;
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
        // disbale button
        this.isFarmCropSelected = true;
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

    // to enable submit button
    this.isFarmCropSelected = false;
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
        if (value === '') { this.isFarmCropSelected = true; }

        // calling API
        this.allCropsClicked = this.harvestingService.getCrops(value, 'customerCrops', this.customerData?.customer_job[0].customer_id);


        // subscribing to show/hide crop UL
        this.allCropsClicked.subscribe((crops) => {
          console.log('crops', crops);
          if (crops.count === 0) {
            // hiding UL
            this.cropUL = false;
            // disbale button
            this.isFarmCropSelected = true;
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
        // disbale button
        this.isFarmCropSelected = true;
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
    this.isFarmCropSelected = false;

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
