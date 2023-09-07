/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import jsPDF from "jspdf";


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  @ViewChild('truckInput') truckInput: ElementRef;
  @ViewChild('kartInput') kartInput: ElementRef;
  @ViewChild('fieldInput') fieldInput: ElementRef;
  // @ViewChild('machineryInput') machineryInput: ElementRef;
  @ViewChild('jobInput') jobInput: ElementRef;
  @ViewChild('destinationInput') destinationInput: ElementRef;
  @ViewChild('field_split_load_input') field_split_load_input: ElementRef;

  role: any;
  isReassign: boolean;
  // isSplitTrue = false;
  isSplitTrue;

  deliveryTicketForm: FormGroup;
  deliveryTicketReassignForm: FormGroup;
  cartOperatorName;

  // observables
  allTruckDrivers: Observable<any>;
  allKartOperators: Observable<any>;
  allFields: Observable<any>;
  allSplitLoadFields: Observable<any>;
  allDestinations: Observable<any>;

  // subjects
  trick_driver_search$ = new Subject();
  kart_operator_search$ = new Subject();
  field_search$ = new Subject();
  field_split_load_search$ = new Subject();
  destination_search$ = new Subject();

  // input values
  trick_driver_name: any = '';
  kart_operator_name: any = '';
  field_name: any = '';
  destination_name: any = '';
  field_split_load_name: any = '';

  // input's search values
  truckDriverSearchValue: any;
  kartOperatorSearchValue: any;
  fieldSearchValue: any;
  fieldSplitLoadSearchValue: any;
  destinationSearchValue: any;

  // to show UL's
  truckDriverUL: any = false;
  kartOperatorUL: any = false;
  fieldUL: any = false;
  destinationUL: any = false;
  fieldSplitLoadUL: any = false;

  // for invalid
  isTruckDriverSelected: any = true;
  isKartOperatorSelected: any = true;
  isFieldSelected: any = true;
  isDestinationSelected: any = true;
  isFieldSplitLoadSelected: any = true;
  currentDate: any = moment(new Date()).format('MM-DD-YYYY');

  // Profile variables
  customerData: any;
  isLoading: any;
  isFieldDisabled: any = false;
  isFieldSplitLoadDisabled: any = false;

  //reassign variables
  reassignTicketData: any;
  isLoadingTicket$: Observable<any>;

  // machinery variables
  // allMachinery: Observable<any>;
  // machine_search$ = new Subject();
  // machine_name: any = '';
  // machineSearchValue: any = '';
  // machineUL: any = false;
  // isMachineSelected: any = true;

  // job variables
  allJobs: Observable<any>;
  job_search$ = new Subject();
  job_name: any = '';
  preFilledJob: any = '';
  jobSearchValue: any = '';
  jobUL: any = false;
  isJobSelected: any = true;

  //Print Divs
  showDiv = "none";

  // farmers bin variable
  isFarmersBin: boolean = false;

  customerName;
  state;
  farm;
  crop;
  crewChiefName;
  date;
  customer_id;
  farm_id;
  truck_driver_name;

  add_location_overlay = true;
  sub;
  subLoading;
  public loadingSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private router: Router,
    private formbuildr: FormBuilder,
    private harvestingService: HarvestingService,
    private sessionService: AuthService,
    private toastService: ToastService,
    private renderer: Renderer2
  ) {
    if (!this.router.getCurrentNavigation()?.extras?.state?.reassign) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.truckInput?.nativeElement) {
          // this.allTruckDrivers = of([]);
          this.truckDriverUL = false; // to hide the UL
        }
        if (e.target !== this.kartInput?.nativeElement) {
          this.allKartOperators = of([]);
          this.kartOperatorUL = false; // to hide the UL
        }

        if (e.target !== this.fieldInput?.nativeElement) {
          // this.allFields = of([]);
          this.fieldUL = false; // to hide the UL
        }
        if (e.target !== this.jobInput.nativeElement) {
          this.allJobs = of([]);
          this.jobUL = false; // to hide the UL
        }
        if (this.isSplitTrue) {
          if (e.target !== this.field_split_load_input.nativeElement) {
            this.allSplitLoadFields = of([]);
            this.fieldSplitLoadUL = false; // to hide the UL
          }
        }
        if (e.target !== this.destinationInput.nativeElement) {
          this.allDestinations = of([]);
          this.destinationUL = false; // to hide the UL
        }
      });
    }
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
    this.sub.unsubscribe();
    this.subLoading.unsubscribe();
  }

  ngOnInit() {
    // toast
    this.toastService.presentToast(
      'Have you entered beg of day/job hours?',
      'primary'
    );
    this.role = localStorage.getItem('role');
    this.cartOperatorName = localStorage.getItem('employeeName');
    this.isReassign =
      this.router.getCurrentNavigation().extras?.state?.reassign;

    this.deliveryTicketForm = this.formbuildr.group({
      truckDriverId: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      loadedMiles: ['', [Validators.required]],
      field: [''],
      split_load_check: [false],
      delivery_ticket_number: [''],
      kartOperatorId: [''],
      truck_driver_company: [''],
      truckId: [''],
      kart_scale_weight_split: [''],
      field_load_split: [''],
      status: ['sent'],
      working_status: ['pending'],
      cropName: [''],
      fieldId: [''],
      employeeId: [''],
      customer_id: [''],
      state: [''],
      farm_id: [''],
      crop_id: [''],
      crew_chief_id: [''],
      jobId: [''],
      deliveryTicketNumber: [''],
      farmers_bin_check: [this.isFarmersBin],
      farmers_bin_weight: [''],
      destinationId: ['']
    });

    // custom validation for 'farmers_bin_weight'
    this.deliveryTicketForm.valueChanges.subscribe(val => {
      if (!val.farmers_bin_check) {
        this.deliveryTicketForm.get('farmers_bin_weight').setErrors(null);
        this.deliveryTicketForm.get('farmers_bin_weight').setValidators(null);
      } else {
        this.deliveryTicketForm.get('farmers_bin_weight').setValidators([Validators.required]);
      }
    })

    // custom validation for 'kart_scale_weight_split'
    this.deliveryTicketForm.valueChanges.subscribe((value) => {
      // console.log(value);
      if (!value.split_load_check) {
        this.deliveryTicketForm.get('kart_scale_weight_split').setValidators(null);
        this.deliveryTicketForm.get('kart_scale_weight_split').setErrors(null);
      } else {
        this.deliveryTicketForm.get('kart_scale_weight_split').setValidators([Validators.required]);
        this.deliveryTicketForm.get('kart_scale_weight_split').setValidators([Validators.required]);
      }
    });


    this.deliveryTicketReassignForm = this.formbuildr.group({
      truck_driver_id: ['', [Validators.required]],
      status: ['sent'],
    });

    if (!this.isReassign) {
      // Search
      this.truckDriverSearchSubscription();
      this.fieldSearchSubscription();
      // this.machineSearchSubscription();
      this.jobSearchSubscription();
      this.fieldSplitLoadSearchSubscription();
      this.destinationSearchSubscription();

      this.initApis();
      this.initObservables();
    } else {
      this.getTicketById();
      this.initTicketByIdObservables();
    }
  }

  initApis() {
    let crew_chief_id = '';
    this.harvestingService.getKartOperatorCrewChief('getKartOpCrewChief', localStorage.getItem('employeeId')).subscribe(param => {
      crew_chief_id = param[0].id;

      this.harvestingService.getJobTesting2(
        'Cart Operator',
        localStorage.getItem('employeeId'),
        crew_chief_id
      );
    });

    this.getCreatedJobData();

  }

  initObservables() {
    this.sub = this.harvestingService.customerJobSetup2$.subscribe((response) => {
      if (response) {
        // Customer Data!
        this.customerData = response;
      }
    });

    this.subLoading = this.harvestingService.customerJobSetupLoading2$.subscribe((val) => {
      this.isLoading = val;
      if (!val) {
        this.patchForm();
      }
    });

  }
  async ionViewDidEnter() {
    this.getCreatedJobData();
  }
  getCreatedJobData() {

    this.harvestingService.getMaxDeliveryTicket().subscribe((res) => {
      this.deliveryTicketForm.patchValue({
        deliveryTicketNumber: +res[0].max + 1
      })
    });

    this.sessionService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((res) => {
      this.preFilledJob = res.invoiced_job ? res.invoiced_job : '';

      if (this.preFilledJob != '' || !this.preFilledJob) {
        let all_jobs = this.harvestingService.getInvoicedJobs(
          'getInvoicedJobs',
          this.role,
          localStorage.getItem('employeeId')
        );
        // subscribing to show/hide field UL
        all_jobs.subscribe((job) => {
          if (job.jobs) {
            for (let jobb of Object.entries(job.jobs)) {
              if (this.preFilledJob == jobb[1]['job_id']) {
                this.listClickedJob(jobb[1])
              }
            }
          }
          this.jobUL = false;
        });
      }
      this.deliveryTicketForm.patchValue({
        jobId: res.invoiced_job ? res.invoiced_job : '',
      });

      //loaded miles
      this.deliveryTicketForm.controls.loadedMiles.setValue(res.loaded_miles);
    });
  }

  patchForm() {
    this.deliveryTicketForm.patchValue({
      kartOperatorId: localStorage.getItem('employeeId'),
      customerId: this.customerData.customer_job[0]?.customer_id,
      state: this.customerData.customer_job[0]?.state,
      farmId: this.customerData.customer_job[0]?.farm_id,
      cropId: this.customerData.customer_job[0]?.crop_id,
      cropName: this.customerData.customer_job[0]?.crop,
      fieldId: this.customerData.customer_job[0]?.field_id,
      field: this.customerData.customer_job[0]?.field_name,
    });
    console.log(this.deliveryTicketForm.value);
  }

  patchReassignForm() {
    this.deliveryTicketReassignForm.patchValue({
      truckDriverId: this.reassignTicketData.truck_driver_id,
    });
  }

  getTicketById() {
    this.harvestingService.getTicketById(
      this.router.getCurrentNavigation().extras.state.ticketId,
      'verify-ticket-kart'
    );
  }

  initTicketByIdObservables() {
    this.isLoadingTicket$ = this.harvestingService.ticketLoading$;

    this.harvestingService.ticket$.subscribe((res) => {
      this.reassignTicketData = res;
      if (res) {
        this.patchReassignForm();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  buttton() {
    this.isSplitTrue = !this.isSplitTrue;

    if (!this.isSplitTrue) {
      this.deliveryTicketForm.patchValue({
        kart_scale_weight_split: '',
        field_load_split: ''
      });

      this.field_split_load_input.nativeElement.value = ''; // emplty name in select's input
      this.isFieldSplitLoadSelected = true; // to enable submit button
      this.field_split_load_name = '';
    }
  }

  //#region farmer bin check
  checkFarmersBin() {
    this.isFarmersBin = !this.isFarmersBin;

    if (!this.isFarmersBin) {
      // for clearing validations
      this.deliveryTicketForm.controls.farmers_bin_weight.setValue(''); //empty field name
    }
  }
  //#endregion

  submit() {
    // navigating
    if (!this.isReassign) {
      console.log('deliveryTicketForm', this.deliveryTicketForm.value);
      this.loadingSpinner.next(true);
      this.harvestingService.kartOperatorCreateDeliveryTicket('createDeliveryTicket', this.deliveryTicketForm.value)
        .subscribe((response: any) => {
          if (response?.status === 200) {
            // stop loader
            this.loadingSpinner.next(false);

            // toast
            this.toastService.presentToast(
              'Delivery Ticket has been created.',
              'success'
            );

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');

            // form reset
            this.deliveryTicketForm.reset();
            this.trick_driver_name = '';
            this.truckInput.nativeElement.value = '';
            this.fieldInput.nativeElement.value = '';
            this.jobInput.nativeElement.value = '';
            if (this.isSplitTrue) { this.field_split_load_input.nativeElement.value = ''; }
            this.isSplitTrue = false;
            this.isFieldSelected = true;

          } else {
            console.log('Something happened :)');
            this.loadingSpinner.next(false);
          }
        },
          (err) => {
            console.log('Error:', err);
            this.loadingSpinner.next(false);
          }
        );
    } else {
      this.loadingSpinner.next(true);

      this.harvestingService
        .updateTicket(
          this.reassignTicketData.delivery_ticket_number,
          this.deliveryTicketReassignForm.value
        )
        .subscribe(
          (res: any) => {
            console.log('Response:', res);
            if (res.status === 200) {
              this.loadingSpinner.next(false);

              this.toastService.presentToast(res.message, 'success');
              // navigating
              this.router.navigateByUrl('/tabs/home/harvesting');

            } else {
              console.log('Something happened :)');
              this.loadingSpinner.next(false);

            }
          },
          (err) => {
            console.log('Error:', err);
            this.loadingSpinner.next(false);

          }
        );
    }
  }

  //#region Truck Driver
  truckDriverSearchSubscription() {
    this.trick_driver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.truckDriverSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isTruckDriverSelected = true;
        }

        // calling API
        this.allTruckDrivers = this.harvestingService.getKartOperatorTruckDrivers(
          'kartOperatorTruckDrivers',
          localStorage.getItem('employeeId'),
          ''
        );

        // subscribing to show/hide field UL
        this.allTruckDrivers.subscribe((truckDrivers) => {
          if (truckDrivers.length === 0) {
            // hiding UL
            this.truckDriverUL = false;

            this.isTruckDriverSelected = true;
          } else {
            this.truckDriverUL = true;
          }
        });
      });
  }

  inputClickedTruckDriver() {
    // getting the serch value to check if there's a value in input
    this.trick_driver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.truckDriverSearchValue = v;
      });

    const value =
      this.truckDriverSearchValue === undefined
        ? this.trick_driver_name
        : this.truckDriverSearchValue;

    // calling API
    this.allTruckDrivers = this.harvestingService.getKartOperatorTruckDrivers(
      'kartOperatorTruckDrivers',
      localStorage.getItem('employeeId'),
      this.truckDriverSearchValue
    );

    // subscribing to show/hide field UL
    this.allTruckDrivers.subscribe((truckDrivers) => {
      // console.log('truck-drivers:', truckDrivers);
      if (truckDrivers.length === 0) {
        // hiding UL
        this.truckDriverUL = false;
      } else {
        // showing UL
        this.truckDriverUL = true;
      }
    });
  }

  listClickedTruckDriver(truckdriver) {
    this.deliveryTicketForm.patchValue({
      truckDriverId: truckdriver.id,
    });
    // hiding UL
    this.truckDriverUL = false;

    // passing name in select's input
    this.truckInput.nativeElement.value = truckdriver.name;
    this.truck_driver_name = truckdriver.name;

    // to enable submit button
    this.isTruckDriverSelected = false;

    // assigning values in form
    this.deliveryTicketReassignForm.patchValue({
      truckDriverId: truckdriver.id,
    });

    // clearing array
    // this.allTruckDrivers = of([]);
  }

  //#endregion

  //#region Field
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
        if (value === '') {
          this.isFieldSelected = true;
        }

        // calling API
        this.allFields = this.harvestingService.getFields(
          value,
          'customerFields',
          this.customer_id,
          this.farm_id
        );

        // subscribing to show/hide field UL
        this.allFields.subscribe((fields) => {
          if (fields.count === 0) {
            // hiding UL
            this.fieldUL = false;

            // for asterik to look required
            this.isFieldSelected = true;
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

    // calling API // need id to check
    this.allFields = this.harvestingService.getFields(
      value,
      'customerFields',
      this.customer_id,
      this.farm_id
    );

    // subscribing to show/hide field UL
    this.allFields.subscribe((fields) => {
      console.log('first', fields);
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
    this.deliveryTicketForm.patchValue({
      fieldId: field?.field_id,
      field: field?.field_name,
    });
    // hiding UL
    this.fieldUL = false;

    // passing name in select's input
    this.fieldInput.nativeElement.value = field.field_name;
    this.field_name = field.field_name;
    // to enable submit button
    this.isFieldSelected = false;

    // clearing array
    this.allFields = of([]);
  }
  //#endregion

  //#region Field Split Load
  fieldSplitLoadSearchSubscription() {
    this.field_split_load_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.fieldSplitLoadSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isFieldSplitLoadSelected = true;
        }

        // calling API
        this.allSplitLoadFields = this.harvestingService.getFields(
          value,
          'customerFields',
          this.customer_id,
          this.farm_id
        );

        // subscribing to show/hide field UL
        this.allSplitLoadFields.subscribe((fields) => {
          if (fields.count === 0) {
            // hiding UL
            this.fieldSplitLoadUL = false;

            // for asterik to look required
            this.isFieldSplitLoadSelected = true;
          } else {
            this.fieldSplitLoadUL = true;
          }
        });
      });
  }
  inputClickedFieldSplitLoad() {
    // getting the serch value to check if there's a value in input
    this.field_split_load_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.fieldSplitLoadSearchValue = v;
      });

    const value =
      this.fieldSplitLoadSearchValue === undefined
        ? this.field_split_load_name
        : this.fieldSplitLoadSearchValue;

    // calling API // need id to check
    this.allSplitLoadFields = this.harvestingService.getFields(
      value,
      'customerFields',
      this.customer_id,
      this.farm_id
    );

    // subscribing to show/hide field UL
    this.allSplitLoadFields.subscribe((fields) => {
      console.log('first', fields);
      if (fields.count === 0) {
        // hiding UL
        this.fieldSplitLoadUL = false;
      } else {
        // showing UL
        this.fieldSplitLoadUL = true;
      }
    });
  }
  listClickedFieldSplitLoad(field) {
    this.deliveryTicketForm.patchValue({
      field_load_split: field?.field_id,
      // field: field?.field_name,
    });
    // hiding UL
    this.fieldSplitLoadUL = false;

    // passing name in select's input
    this.field_split_load_input.nativeElement.value = field.field_name;
    this.field_split_load_name = field.field_name;
    // to enable submit button
    this.isFieldSplitLoadSelected = false;

    // clearing array
    this.allSplitLoadFields = of([]);
  }
  //#endregion

  //#region job
  jobSearchSubscription() {
    this.job_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {

        // passing for renderer2
        this.jobSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isJobSelected = true;
        }

        // calling API
        this.allJobs = this.harvestingService.getInvoicedJobs(
          'getInvoicedJobs',
          this.role,
          localStorage.getItem('employeeId')
        );

        // subscribing to show/hide machine UL
        this.allJobs.subscribe((job) => {
          if (job.count === 0) {

            this.jobUL = false; // hiding UL
            this.isJobSelected = true; // for asterik to look required
          } else {
            this.jobUL = true; // hiding UL
          }
        });
      });
  }

  inputClickedJob() {
    // getting the serch value to check if there's a value in input
    this.job_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.jobSearchValue = v;
      });

    const value =
      this.jobSearchValue === undefined
        ? this.job_name
        : this.jobSearchValue;

    // calling API
    this.allJobs = this.harvestingService.getInvoicedJobs(
      'getInvoicedJobs',
      this.role,
      localStorage.getItem('employeeId')
    );

    // subscribing to show/hide field UL
    this.allJobs.subscribe((job) => {
      console.log(job);
      if (job.count === 0) {
        // hiding UL
        this.jobUL = false;
      } else {
        // showing UL
        this.jobUL = true;
      }
    });
  }

  listClickedJob(job) {
    console.log('job', job);
    // hiding UL
    this.jobUL = false;

    // patching
    this.deliveryTicketForm.patchValue({
      jobId: job.job_id,
      crop_id: job.crop_id,
      customer_id: job.customer_id,
      farm_id: job.farm_id,
      state: job.state,
      crew_chief_id: job.crew_chief_id,
    });

    this.customerName = job.customer_name;
    this.state = job.state;
    this.farm = job.farm_name;
    this.crop = job.crop_name;
    this.date = job.created_at;
    this.crewChiefName = job.crew_chief_name;
    this.customer_id = job.customer_id;
    this.farm_id = job.farm_id;

    // passing name in select's input
    this.jobInput.nativeElement.value = 'Job# ' + job.job_setup_name;

    // passing name in job-search-value in Rendered2 for checks
    this.jobSearchValue = job.customer_name;

    // to enable submit button
    this.isJobSelected = false;
  }
  //#endregion

  //#region Destination
  destinationSearchSubscription() {
    this.destination_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.destinationSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isDestinationSelected = true;
        }

        // calling API
        this.allDestinations = this.harvestingService.getCustomerDestination(
          value,
          'getCustomerDestination',
          this.customer_id,
          this.farm_id
        );

        // subscribing to show/hide field UL
        this.allDestinations.subscribe((destination) => {
          if (destination.length === 0) {
            // hiding UL
            this.destinationUL = false;

            this.isDestinationSelected = true;
          } else {
            this.destinationUL = true;
          }
        });
      });
  }

  inputClickedDestination() {
    // getting the serch value to check if there's a value in input
    this.destination_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.destinationSearchValue = v;
      });

    const value =
      this.destinationSearchValue === undefined
        ? this.destination_name
        : this.destinationSearchValue;

    // calling API
    this.allDestinations = this.harvestingService.getCustomerDestination(
      value,
      'getCustomerDestination',
      this.customer_id,
      this.farm_id
    );

    // subscribing to show/hide field UL
    this.allDestinations.subscribe((destination) => {
      if (destination.length === 0) {
        // hiding UL
        this.destinationUL = false;
      } else {
        // showing UL
        this.destinationUL = true;
      }
    });
  }

  listClickedDestination(destination) {
    this.deliveryTicketForm.patchValue({
      destination: destination.name,
      destinationId: destination.id
    });
    // hiding UL
    this.destinationUL = false;

    // passing name in select's input
    this.destinationInput.nativeElement.value = destination.name;
    this.destination_name = destination.name;

    // to enable submit button
    this.isDestinationSelected = false;

    // clearing array
    this.allDestinations = of([]);
  }

  //#endregion

  printDiv(ticket) {
    // this.showDiv = ticket;

    // setTimeout(() => {
    //   window.print();
    //   this.showDiv = "none";
    //   return false
    // }, 100);
    this.generatePdf(ticket);
  }

  generatePdf(ticket) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in", // Units are in inches
      format: [3, 3] // 4 inches by 3 inches
    });
    doc.setFontSize(8); // Set font size
    doc.setFont('helvetica', 'bold');

    if (ticket === 'envelopeInfo') {
      //Date
      doc.text("Date", 0.1, 0.2);
      doc.text(this.currentDate, 1.2, 0.2);

      //Harvesting Job
      doc.text("Harvest Job", 0.1, 0.4);
      doc.text(this.customerName, 1.2, 0.4);

      //Farm
      doc.text("Farm", 0.1, 0.6);
      doc.text(this.farm, 1.2, 0.6);

      //Field
      doc.text("Field/Pivot", 0.1, 0.8);
      doc.text(this.field_name, 1.2, 0.8);

      //Crop
      doc.text("Crop", 0.1, 1);
      doc.text(this.crop, 1.2, 1);

      //Crew Cheif
      doc.text("Crew Chief", 0.1, 1.2);
      doc.text(this.crewChiefName, 1.2, 1.2);

      //DHT Tickets
      doc.text("DHT Tickets", 0.1, 1.4);
      doc.text("_____________", 1.2, 1.4);

      //Farmer Tickets
      doc.text("Farmer Tickets", 0.1, 1.6);
      doc.text("_____________", 1.2, 1.6);

      //Total Tickets
      doc.text("Total Tickets", 0.1, 1.8);
      doc.text("_____________", 1.2, 1.8);
    }
    else if (ticket === 'deliveryTicket') {

      doc.setLineWidth(0.02);
      doc.line(0, 0.05, 4, 0.05);
      doc.text("Demary Harvesting and Trucking", 0.6, 0.2);
      doc.setLineWidth(0.02);
      doc.line(0, 0.25, 4, 0.25);
      doc.text("Date", 0.1, 0.4);
      doc.text(this.currentDate, 1.2, 0.4);


      doc.text("Delivery Ticket #", 0.1, 0.6);
      doc.text(`${this.deliveryTicketForm.get('deliveryTicketNumber').value}`, 1.2, 0.6);


      doc.line(0, 0.65, 4, 0.65);

      doc.text("Owner/Seller", 0.1, 0.8);
      doc.text(this.customerName, 1.2, 0.8);

      doc.text("Farm", 0.1, 1);
      doc.text(this.farm, 1.2, 1);

      doc.text("Field/Pivot", 0.1, 1.2);
      doc.text(this.field_name, 1.2, 1.2);

      doc.line(0, 1.25, 4, 1.25);


      doc.text("Crop", 0.1, 1.4);
      doc.text(this.crop, 1.2, 1.4);

      doc.text("Destination", 0.1, 1.6);
      doc.text(`${this.deliveryTicketForm.get('destination').value}`, 1.2, 1.6);

      doc.text("Contract", 0.1, 1.8);
      doc.text("Not Specified", 1.2, 1.8);
      doc.line(0, 1.85, 4, 1.85);

      doc.text("Crew Cheif", 0.1, 2);
      doc.text(this.crewChiefName, 1.2, 2);

      doc.text("Cart Op", 0.1, 2.2);
      doc.text(this.cartOperatorName, 1.2, 2.2);

      doc.text("Driver", 0.1, 2.4);
      doc.text(this.truck_driver_name, 1.2, 2.4);
      doc.line(0, 2.45, 4, 2.45);
    }

    else if (ticket === 'envelopeStub') {
      doc.setFontSize(7); // Set font size

      //Column 1
      //Date
      doc.text("Date", 0.05, 0.1);
      doc.text(this.currentDate, 0.6, 0.1);

      //Delivery ticket #
      doc.text("DT#", 0.05, 0.2);
      doc.text(`${this.deliveryTicketForm.get('deliveryTicketNumber').value}`, 0.6, 0.2);

      //Owner/Seller (Customer)
      doc.text("Customer", 0.05, 0.3);
      doc.text(this.customerName, 0.6, 0.3);

      //Farm
      doc.text("Farm", 0.05, 0.4);
      doc.text(this.farm, 0.6, 0.4);

      //Column 2
      //Field/Pivot
      doc.text("Field/Pivot", 1.4, 0.1);
      doc.text(this.field_name, 1.9, 0.1);

      //Driver
      doc.text("Driver", 1.4, 0.2);
      doc.text(this.truck_driver_name.split(' ')[0], 1.9, 0.2);

      //DHT Tickets
      doc.text("Contract", 1.4, 0.3);
      doc.text("Not Specified", 1.9, 0.3);

      //Farmer Tickets
      doc.text("Dest", 1.4, 0.4);
      doc.text(`${this.deliveryTicketForm.get('destination').value}`, 1.9, 0.4);

      doc.setFontSize(8); // Set font size
      //Verified
      doc.text("Verified", 0.05, 0.55);
      doc.setLineWidth(0.01);
      doc.rect(0.5, 0.45, 0.15, 0.15);

      //Scale Ticket
      doc.text("Scale tkt", 0.7, 0.55);
      doc.text("_________", 1.2, 0.55);

      //Weight
      doc.text("Wgt", 1.8, 0.55);
      doc.text("_________", 2.05, 0.55);
    }
    doc.save(`${ticket}.pdf`);
  }

}
