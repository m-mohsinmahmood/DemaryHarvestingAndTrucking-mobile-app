/* eslint-disable radix */

/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';
import { HarvestingService } from './../harvesting.service';
import { BehaviorSubject, Observable, of, Subject, } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-job-setup',
  templateUrl: './job-setup.page.html',
  styleUrls: ['./job-setup.page.scss'],
})
export class JobSetupPage implements OnInit {
  @ViewChild('customerInput') customerInput: ElementRef;
  @ViewChild('farmInput') farmInput: ElementRef;
  @ViewChild('cropInput') cropInput: ElementRef;
  @ViewChild('directorInput') directorInput: ElementRef;
  // @ViewChild('fieldInput') fieldInput: ElementRef;

  // form
  jobSetupForm: FormGroup;
  public activeCheckInSpinner = new BehaviorSubject(false);
  active_check_in_id: any;

  // observables
  allCustomers: Observable<any>;
  allFarms: Observable<any>;
  allFarmsClicked: Observable<any>;
  allCrops: Observable<any>;
  allCropsClicked: Observable<any>;
  allDirectors: Observable<any>;
  // allFields: Observable<any>;

  // subjects
  customer_search$ = new Subject();
  farm_search$ = new Subject();
  crop_search$ = new Subject();
  director_search$ = new Subject();
  // field_search$ = new Subject();

  // input values
  customer_name: any = '';
  farm_name: any = '';
  crop_name: any = '';
  director_name: any = '';
  jobId;
  // field_name: any = '';

  // input's search values
  customerSearchValue: any = '';
  farmSearchValue: any = '';
  cropSearchValue: any = '';
  directorSearchValue: any = '';

  // fieldSearchValue: any = '';

  // to show UL's
  customerUL: any = false;
  farmUL: any = false;
  cropUL: any = false;
  directorUL: any = false;

  // fieldUL: any = false;

  // for invalid
  isCustomerSelected: any = true;
  isFarmSelected: any = true;
  isCropSelected: any = true;
  isDirectorSelected: any = true;
  // isFieldSelected: any = true;

  // selected customer id to select farms & crops
  customerID: any;
  // selected farm id to select fields
  farmID: any;
  cropID: any;


  isDisabled: any = true;
  // isFieldDisabled: any = true;

  states: string[];
  add_location_overlay = true;
  subscribe;
  loadingSub;
  customerData: any;

  public loadingSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private dwrServices: CheckInOutService,
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private router: Router

  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.customerInput.nativeElement) {
        if (this.customerSearchValue === '' || this.isCustomerSelected === true) {
          this.isDisabled = true;
          this.farm_name = '';
          this.crop_name = '';
          this.customerUL = false; // to hide the UL
          this.isCustomerSelected = true;
          this.isFarmSelected = true;
          this.isCropSelected = true;
          // this.isFieldDisabled = true;
          this.farmSearchValue = ''; // to disable field
        } else {
          this.isDisabled = false;
          this.allCustomers = of([]); // to clear array
          this.customerUL = false; // to hide the UL
        }
      }

      if (e.target !== this.farmInput.nativeElement) {
        // this.allFarmsClicked = of([]);
        // this.farmUL = false; // to hide the UL
        if (this.farmSearchValue === '' || this.farmSearchValue === undefined || this.isFarmSelected === true) {
          // this.isFieldDisabled = true;
          // this.field_name = '';
          this.farmUL = false;
        } else {
          // this.isFieldDisabled = false;
          this.allFarms = of([]);
        }
      }
      if (e.target !== this.cropInput.nativeElement) {
        this.allCropsClicked = of([]);
        this.cropUL = false; // to hide the UL
      }
      if (e.target !== this.directorInput.nativeElement) {
        this.allDirectors = of([]);
        this.directorUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    this.initForms();

    // pasing states
    this.states = states;
    this.initApis();
    this.initObservables();

    this.getCreatedJobData();

    this.customerSearchSubscription();
    this.farmSearchSubscription();
    this.cropSearchSubscription();
    this.directorSearchSubscription();
    // this.fieldSearchSubscription();
  }
  async ionViewDidEnter() {
    this.getCreatedJobData();
  }
  getCreatedJobData() {
    this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((res) => {
      console.log('Employee Details:', res);

      if (res.customer_id !== null) {
        //patching
        this.jobSetupForm.patchValue({
          director_id: res.director_id,
          state: res.state,
          customer_id: res.customer_id,
          farm_id: res.farm_id,
          crop_id: res.crop_id,
          crew_chief_id: localStorage.getItem('employeeId'),
          employee_id: localStorage.getItem('employeeId'),
        });

        // for input values
        this.cropInput.nativeElement.value = res.crop_name;
        this.farmInput.nativeElement.value = res.farm_name;
        this.customerInput.nativeElement.value = res.customer_name;
        this.directorInput.nativeElement.value = res.director_name;


        // for validation to look asterik and button diasbale
        this.isCustomerSelected = false;
        this.isDirectorSelected = false;
        this.isFarmSelected = false;
        this.isCropSelected = false;

        this.isDisabled = false;

        this.customerID = res.customer_id;

        this.customerSearchValue = res.customer_name;

      }
    });
  }

  initApis() {
    // getting for Crew Chief only
    // this.harvestingService.getJobSetup('Crew Chief', localStorage.getItem('employeeId'));
  }

  initObservables() {
    // this.subscribe = this.harvestingService.customerJobSetup$.subscribe((res) => {
    //   console.log('Response', res);
    //   this.customerData = res;
    // });

    this.loadingSub = this.harvestingService.customerLoading$.subscribe((val) => {
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    // this.subscribe.unsubscribe();
    this.loadingSub.unsubscribe();
  }

  initForms() {
    this.jobSetupForm = this.formBuilder.group({
      crew_chief_id: [localStorage.getItem('employeeId')],
      employee_id: [localStorage.getItem('employeeId')],
      state: ['', [Validators.required]],
      customer_id: [''],
      farm_id: [''],
      crop_id: [''],
      director_id: [''],
      is_close: [false],
      total_acres: [''],
      total_gps_acres: [''],
      active_check_in_id: [''],
      newJobSetup:[true]
    });
  }

  goBack() {
    this.location.back();
  }

  submit() {
    // loader
    this.loadingSpinner.next(true);

    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      this.activeCheckInSpinner.next(true);
      this.active_check_in_id = workOrder.dwr[0].id;
      this.activeCheckInSpinner.next(false);

      // patching
      this.jobSetupForm.patchValue({
        active_check_in_id: this.active_check_in_id
      });

      // data submit
      this.checkJob();

    });
  }
  checkJob(){
    this.harvestingService.
    checkJob(this.jobSetupForm.get('customer_id').value, this.jobSetupForm.get('farm_id').value,this.jobSetupForm.get('crop_id').value)
    .subscribe(
      (res: any) => {
        console.log('Response:', res);
        if (res.status === 200 && parseInt(res.total_jobs.count) === 0) {
          //create job
          this.createJob();
        }
        else if (res.status === 200 && parseInt(res.total_jobs.count) >= 1) {
           //toast
        this.toastService.presentToast('Job already exists with same customer, farm and crop', 'warning');

        this.loadingSpinner.next(false); // stop loader


        } else {
          console.log('Something happened :)');
          this.loadingSpinner.next(false);

        }
      },
      (err) => {
        console.log('Error:', err);
        this.loadingSpinner.next(false);

      },
    );
  }
createJob(){
  this.harvestingService.createJob(this.jobSetupForm.value)
  .subscribe(
    (res: any) => {
      console.log('Response:', res);
      if (res.status === 200) {
        // this.loadingSpinner.next(false);
        this.jobSetupForm.reset();
        this.isDisabled = true;
        this.customer_name = '';
        this.farm_name = '';
        this.crop_name = '';
        this.farm_name = '';
        this.directorInput.nativeElement.value = '';
        this.customerInput.nativeElement.value = '';
        this.farmInput.nativeElement.value = '';
        this.cropInput.nativeElement.value = '';
        // this.toastService.presentToast(res.message, 'success');
        this.jobId = res.id.record_id;

        //DWR
        this.createDWR();

      } else {
        console.log('Something happened :)');
        this.loadingSpinner.next(false);

      }
    },
    (err) => {
      console.log('Error:', err);
      this.loadingSpinner.next(false);

    },
  );
}
  createDWR() {
    this.harvestingService
      .createDWR(localStorage.getItem('employeeId'), this.jobId, this.jobSetupForm.get('director_id').value, this.active_check_in_id)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            // to stop loader
            this.loadingSpinner.next(false);

            //toast
        this.toastService.presentToast(res.message, 'success');


            // navigation
            this.router.navigate(['/tabs/home/harvesting']);

          } else {
            this.loadingSpinner.next(false);
            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          this.loadingSpinner.next(false);
          this.toastService.presentToast(err.mssage, 'danger');
        }
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
        if (value === '') {
          this.isCustomerSelected = true;
          this.farmInput.nativeElement.value = '';
          this.cropInput.nativeElement.value = '';
          this.isDisabled = true;
          this.isFarmSelected = true;
          this.isCropSelected = true;

        }


        this.allCustomers = this.harvestingService.getCustomers(value, 'allCustomers');
        // // showing UL
        // this.customerUL = true;

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers) => {
          // this.isDisabled = customers.count === 0 ? true : false;
          if (customers.count === 0) {
            this.isDisabled = true;
            // this.isFieldDisabled = true;

            // for asterik
            this.isCustomerSelected = true;
            this.isFarmSelected = true;
            this.isCropSelected = true;
            // this.isFieldSelected = true;

            // passing empty string for Renderer2 condition
            this.farmSearchValue = '';
            // this.fieldSearchValue = '';
            this.cropSearchValue = '';

            // passing for Renderer2 condition
            this.isCustomerSelected = true;

            // clearing the input values in farm, crop after getting disabled
            // this.farm_name = '';
            // this.crop_name = '';
            // this.field_name = '';
            this.farmInput.nativeElement.value = '';
            // this.fieldInput.nativeElement.value = '';
            this.cropInput.nativeElement.value = '';

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
    this.allCustomers = this.harvestingService.getCustomers(this.customerSearchValue, 'allCustomers');

    // subscribing to disable & enable farm, crop inputs
    this.allCustomers.subscribe((customers) => {
      // this.isDisabled = customers.count === 0 ? true : false;
      if (customers.count === 0) {
        this.isDisabled = true;

        // clearing the input values in farm, crop after getting disabled
        // this.farm_name = '';
        // this.crop_name = '';
        // this.field_name = '';
        this.farmInput.nativeElement.value = '';
        this.cropInput.nativeElement.value = '';
        // this.fieldInput.nativeElement.value = '';

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
            // this.isFieldDisabled = true;
            // this.fieldInput.nativeElement.value = '';
            this.isFarmSelected = true; //for asterik
            // this.isFieldSelected = true; //for asterik
            this.farmUL = false; // hiding UL

          } else {
            // showing UL
            this.farmUL = true;
            // this.isFieldDisabled = false;
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
    this.allFarmsClicked = this.harvestingService.getFarms(this.farmSearchValue, 'customerFarms', this.customerID);


    // subscribing to show/hide farm UL
    this.allFarmsClicked.subscribe((farms) => {
      console.log('Farms', farms);

      if (farms.count === 0) {
        // hiding UL
        this.farmUL = false;
        // this.isFieldDisabled = true;
      } else {
        // showing UL
        this.farmUL = true;
        // this.isFieldDisabled = false;
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

    this.cropID = crop.crop_id;

    // clearing array
    this.allCrops = of([]);
    this.allCropsClicked = of([]);
  }
  //#endregion
  //#region Fields
  // fieldSearchSubscription() {
  //   this.field_search$
  //     .pipe(
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       takeUntil(this._unsubscribeAll)
  //     )
  //     .subscribe((value: string) => {
  //       // passing for renderer2
  //       this.fieldSearchValue = value;
  //       // for asterik to look required
  //       if (value === '') { this.isFieldSelected = true; }

  //       // calling API
  //       this.allFields = this.harvestingService.getFields(value, 'customerFields', this.customerID, this.farmID);

  //       // subscribing to show/hide field UL
  //       this.allFields.subscribe((fields) => {
  //         if (fields.count === 0) {
  //           // hiding UL
  //           this.fieldUL = false;
  //         } else {
  //           this.fieldUL = true;
  //         }
  //       });
  //     });
  // }
  // inputClickedField() {
  //   // getting the serch value to check if there's a value in input
  //   this.field_search$
  //     .pipe(
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       takeUntil(this._unsubscribeAll)
  //     )
  //     .subscribe((v) => {
  //       this.fieldSearchValue = v;
  //     });

  //   const value =
  //     this.fieldSearchValue === undefined
  //       ? this.field_name
  //       : this.fieldSearchValue;

  //   // calling API
  //   this.allFields = this.harvestingService.getFields('', 'customerFields', this.customerID, this.farmID);

  //   // subscribing to show/hide field UL
  //   this.allFields.subscribe((fields) => {
  //     if (fields.count === 0) {
  //       // hiding UL
  //       this.fieldUL = false;
  //     } else {
  //       // showing UL
  //       this.fieldUL = true;
  //     }
  //   });
  // }
  // listClickedField(field) {
  //   console.log('Field Object:', field);
  //   // hiding UL
  //   this.fieldUL = false;

  //   // passing name in select's input
  //   this.field_name = field.field_name;

  //   // passing name in customer-search-value in Rendered2 for checks
  //   this.fieldInput.nativeElement.value = field.field_name;

  //   // to enable submit button
  //   this.isFieldSelected = false;

  //   // assigning values in form
  //   this.jobSetupForm.patchValue({
  //     field_id: field.field_id
  //   });

  //   // clearing array
  //   this.allFields = of([]);
  // }
  //#endregion
  //  #region Director
  directorSearchSubscription() {
    this.director_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.directorSearchValue = value;
        // for asterik to look required
        if (value === '') { this.isDirectorSelected = true; }

        //calling API
        // this.allEmployees = this.harvestingService.getFarms(value, 'customerFarms', this.customerID);

        this.allDirectors = this.harvestingService.getEmployees(
          value,
          'allEmployees',
          'Director'
        );

        // subscribing to show/hide farm UL
        this.allDirectors.subscribe((directors) => {
          if (directors.count === 0) {
            this.isDirectorSelected = true; //for asterik
            this.directorUL = false; // hiding UL

          } else {
            // showing UL
            this.directorUL = true;
          }
        });
      });
  }
  inputClickedDirector() {
    // getting the serch value to check if there's a value in input
    this.director_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.directorSearchValue = v;
      });

    const value =
      this.directorSearchValue === undefined
        ? this.director_name
        : this.directorSearchValue;

    // calling API
    // this.allDirectors = this.harvestingService.getFarms(this.farmSearchValue, 'customerFarms', this.customerID);
    this.allDirectors = this.harvestingService.getEmployees(
      value,
      'allEmployees',
      'Director'
    );

    // subscribing to show/hide farm UL
    this.allDirectors.subscribe((directors) => {
      console.log('Directors', directors);

      if (directors.count === 0) {
        // hiding UL
        this.directorUL = false;
        this.isDirectorSelected = true;


      } else {
        // showing UL
        this.directorUL = true;
        this.isDirectorSelected = false;

      }
    });
  }
  listClickedDirector(director) {

    // hiding UL
    this.directorUL = false;

    // assigning values in form

    this.jobSetupForm.patchValue({
      director_id: director.id
    });

    // passing name in select's input
    this.directorInput.nativeElement.value = director.first_name + ' ' + director.last_name;

    // clearing array
    this.allDirectors = of([]);
    // this.allFarmsClicked = of([]);

    // passing name in farm-search-value in Rendered2 for checks
    this.directorSearchValue = director.name;

    // to enable submit button
    this.isDirectorSelected = false;
    ;
  }
  //#endregion
}
