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
import { Observable, of, Subject, } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';

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

// selected customer id to select farms & crops
  customerID: any;

  // selected farm id to select fields
  farmID: any;

  isDisabled: any = true;
  isFieldDisabled: any = true;

  states: string[];
  add_location_overlay = true;

  customerData: any;


  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private renderer: Renderer2,
    private toastService: ToastService

  ) {
    this.renderer.listen('window', 'click', (e) => {
      // if (e.target !== this.customerInput.nativeElement) {
      //   // console.log('Customer');
      //   if(this.customerSearchValue === ''){
      //           this.isDisabled = true;
      //           this.farm_name = '';
      //           this.crop_name = '';
      //           this.customerUL = false; // to hide the UL
      //           this.isCustomerSelected= true;
      //           this.isFarmSelected= true;
      //           this.isCropSelected= true;
      //           this.isFieldDisabled = true;

      //   }else{
      //     this.isDisabled = false;
      //     this.allCustomers = of([]); // to clear array
      //     this.customerUL = false; // to hide the UL
      //   }
      // }

      if (e.target !== this.farmInput.nativeElement) {
        // console.log('Farm');
        this.allFarmsClicked = of([]);
        this.farmUL = false; // to hide the UL
      }
      if (e.target !== this.cropInput.nativeElement) {
        // console.log('Crop');
        this.allCropsClicked = of([]);
        this.cropUL = false; // to hide the UL
      }
      // if (e.target !== this.fieldInput.nativeElement) {
      //   // console.log('Field');
      //   this.allFields = of([]);
      //   this.fieldUL = false; // to hide the UL
      // }
    });
  }

  ngOnInit() {
    this.initForms();

    // pasing states
    this.states = states;

    this.customerSearchSubscription();
    this.farmSearchSubscription();
    this.cropSearchSubscription();
    this.fieldSearchSubscription();
    this.initApis();
    this.initObservables();
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
      field_id: [''],
    });
    this.jobUpdateForm = this.formBuilder.group({
      customer_id: [''],
      farm_id: [''],
      crop_id: [''],
    });
  }

initApis(){
  this.harvestingService.getJob();
}
initObservables(){
  this.harvestingService.customer$.subscribe((res)=>{
    // console.log('Response',res);
    this.customerData = res;
    // console.log(this.customerData?.customer_job[0]);

    // passing values
    this.jobSetupForm.patchValue({
      state: this.customerData?.customer_job[0].state,
      customer_id: this.customerData?.customer_job[0].customer_id,
      farm_id: '',
      crop_id: '',
      field_id: '',
    });

    // passing customer & field name's
    this.customer_name = this.customerData?.customer_job[0].customer_name;
    this.field_name = this.customerData?.customer_job[0].field_name;

    //passing customerid for farm & crop
    this.customerID = this.customerData?.customer_job[0].customer_id;

  });
  this.harvestingService.customerLoading$.subscribe((val)=>{
    // console.log('Loading Value',val);
  });
}

  goBack() {
    this.location.back();
  }
  submit() {
    // passing crop & farm id
    this.jobUpdateForm.patchValue({
      customer_id: this.jobSetupForm.get('customer_id').value,
      farm_id: this.jobSetupForm.get('farm_id').value,
      crop_id: this.jobSetupForm.get('crop_id').value,
    });

    this.harvestingService.updateJob(this.jobUpdateForm.value)
     .subscribe(
          (res: any) => {
              console.log('Response:',res);
              if(res.status === 200){
                this.jobSetupForm.reset();
                this.isDisabled = true;
                this.customer_name ='';
                this.farm_name ='';
                this.crop_name = '';
                this.farm_name = '';
                this.field_name = '';
                this.toastService.presentToast(res.message,'success');

                console.log(res.message);
              }else{
                console.log('Something happened :)');
              }
          },
          (err) => {
            console.log('Error:',err);
              // this.handleError(err);
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
        if(value === ''){ this.isCustomerSelected = true;}


        this.allCustomers = this.harvestingService.getCustomers(value,'allCustomers');
        // // showing UL
        // this.customerUL = true;

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers) => {
          // this.isDisabled = customers.count === 0 ? true : false;
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
    this.allCustomers = this.harvestingService.getCustomers('','allCustomers');

    // subscribing to disable & enable farm, crop inputs
    this.allCustomers.subscribe((customers) => {
      // this.isDisabled = customers.count === 0 ? true : false;
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
    console.log('Customer Object:',customer);

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
      customer_name:'',
      farm_id: '',
      farm_name:'',
      crop_id: '',
      crop_name:'',
      initial_field: '',
      field_name:'',
    });

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: customer.id,
      customer_name: customer.customer_name,
      farm_id: this.jobSetupForm.get('farm_id').value,
      farm_name: this.jobSetupForm.get('farm_name').value,
      crop_id: this.jobSetupForm.get('crop_id').value,
      crop_name: this.jobSetupForm.get('crop_name').value,
      initial_field: this.jobSetupForm.get('initial_field').value,
      field_name: this.jobSetupForm.get('field_name').value,
    });

    // passing name in select's input
    this.customer_name = customer.customer_name;

    // passing name in customer-search-value in Rendered2 to checks
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
    this.farm_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
       if(value === ''){ this.isFarmSelected = true;}

       //calling API
        this.allFarmsClicked = this.harvestingService.getFarms(value,'customerFarms',this.customerData?.customer_job[0].customer_id);


        // subscribing to show/hide farm UL
        this.allFarmsClicked.subscribe((farms) => {
          if (farms.count === 0) {
            this.isFieldDisabled = true;
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
    this.allFarmsClicked = this.harvestingService.getFarms('','customerFarms',this.customerID);


    // subscribing to show/hide farm UL
    this.allFarmsClicked.subscribe((farms) => {
      console.log('Farms',farms);

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
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: this.jobSetupForm.get('customer_id').value,
      farm_id: farm.id,
      crop_id: this.jobSetupForm.get('crop_id').value,
      field_id: this.jobSetupForm.get('field_id').value,
    });

      // passing name in select's input
      this.farm_name = farm.name;

    // clearing array
    this.allFarms = of([]);
    this.allFarmsClicked = of([]);

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
        if(value === ''){ this.isCropSelected = true;}

        // calling API
        this.allCropsClicked = this.harvestingService.getCrops(value,'customerCrops',this.customerData?.customer_job[0].customer_id);


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
    this.allCropsClicked = this.harvestingService.getCrops('','customerCrops',this.customerID);


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
    this.crop_name = crop.name;

    // to enable submit button
    this.isCropSelected = false;

    // assigning values in form
    this.jobSetupForm.setValue({
      state: this.jobSetupForm.get('state').value,
      customer_id: this.jobSetupForm.get('customer_id').value,
      farm_id: this.jobSetupForm.get('farm_id').value,
      crop_id: crop.crop_id,
      field_id: this.jobSetupForm.get('field_id').value,
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
      if(value === ''){ this.isFieldSelected = true;}

     // calling API
     this.allFields = this.harvestingService.getFields(value,'customerFields',this.customerID,this.farmID);

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
  this.allFields = this.harvestingService.getFields('','customerFields',this.customerID,this.farmID);

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
  console.log('Field Object:',field);
  // hiding UL
  this.fieldUL = false;

  // passing name in select's input
  this.field_name = field.field_name;

  // to enable submit button
  this.isFieldSelected = false;

  // assigning values in form
  this.jobSetupForm.setValue({
    state: this.jobSetupForm.get('state').value,
    customer_id: this.jobSetupForm.get('customer_id').value,
    customer_name: this.jobSetupForm.get('customer_name').value,
    farm_id: this.jobSetupForm.get('farm_id').value,
    farm_name: this.jobSetupForm.get('farm_name').value,
    crop_id: this.jobSetupForm.get('crop_id').value,
    crop_name: this.jobSetupForm.get('crop_name').value,
    initial_field: field.field_id,
    field_name: field.field_name,
  });

  // clearing array
  this.allFields = of([]);
}
//#endregion
}
