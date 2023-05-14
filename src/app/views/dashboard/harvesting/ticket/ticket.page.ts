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

  // subjects
  trick_driver_search$ = new Subject();
  kart_operator_search$ = new Subject();
  field_search$ = new Subject();

  // input values
  trick_driver_name: any = '';
  kart_operator_name: any = '';
  field_name: any = '';

  // input's search values
  truckDriverSearchValue: any;
  kartOperatorSearchValue: any;
  fieldSearchValue: any;

  // to show UL's
  truckDriverUL: any = false;
  kartOperatorUL: any = false;
  fieldUL: any = false;

  // for invalid
  isTruckDriverSelected: any = true;
  isKartOperatorSelected: any = true;
  isFieldSelected: any = true;

  // Profile variables
  customerData: any;
  isLoading: any;
  isFieldDisabled: any = false;

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
    jobSearchValue: any = '';
    jobUL: any = false;
    isJobSelected: any = true;

  customerName;
  state;
  farm;
  crop;
  crewChiefName;
  date;

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
        else if (e.target !== this.jobInput.nativeElement) {
          this.allJobs = of([]);
          this.jobUL = false; // to hide the UL
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
    this.role = localStorage.getItem('role');
    this.cartOperatorName = localStorage.getItem("employeeName");
    this.isReassign =
      this.router.getCurrentNavigation().extras?.state?.reassign;

    this.deliveryTicketForm = this.formbuildr.group({
      truckDriverId: [''],
      destination: ['', [Validators.required]],
      loadedMiles: ['', [Validators.required]],
      field: [''],
      split_load_check: [false,],
      delivery_ticket_number: ['', [Validators.required]],
      kartOperatorId: ['', [Validators.required]],
      truck_driver_company: ['', [Validators.required]],
      truckId: [''],
      splitLoad: ['', [Validators.required]],
      kartScaleWeight: ['', [Validators.required]],
      kart_scale_weight_split: ['', [Validators.required]],
      field_load_split: ['', [Validators.required]],
      status: ['sent'],
      working_status: ['pending'],
      // customerId: [''],
      // state: [''],
      // farmId: [''],
      // cropId: [''],
      cropName: [''],
      fieldId: [''],
      employeeId: [localStorage.getItem('employeeId')],
      customer_id:[''],
      state:[''],
      farm_id:[''],
      crop_id:[''],
      crew_chief_id:[''],
      jobId:['']
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

  patchForm() {
    console.log('patchForm');

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
      // console.log('response:', res);
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
  }

  submit() {
    // navigating
    if (!this.isReassign) {
      console.log('deliveryTicketForm', this.deliveryTicketForm.value);
      this.loadingSpinner.next(true);
      this.harvestingService.kartOperatorCreateDeliveryTicket('createDeliveryTicket', this.deliveryTicketForm.value)
        .subscribe((response: any) => {
          // console.log('response', response);
          if (response?.status === 200) {
            this.loadingSpinner.next(false);
            // this.deliveryTicketForm.reset();
            this.trick_driver_name = '';
            this.toastService.presentToast(
              'Delivery Ticket has been created.',
              'success'
            );
            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');
          } else {
            console.log('Something happened :)');
          }
        },
          (err) => { console.log('Error:', err); }
        );
    } else {
      console.log(
        'deliveryTicketReassignForm',
        this.deliveryTicketReassignForm.value
      );
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
            }
          },
          (err) => {
            console.log('Error:', err);
          }
        );
    }
  }

  //#region Truck Driver
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
      ''
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
          // console.log('Truck Drivers:', truckDrivers);

          if (truckDrivers.length === 0) {
            // hiding UL
            this.truckDriverUL = false;
          } else {
            this.truckDriverUL = true;
          }
        });
      });
  }

  listClickedTruckDriver(truckdriver) {
    // console.log('Truck Driver Object:', truckdriver);

    this.deliveryTicketForm.patchValue({
      truckDriverId: truckdriver.id,
    });
    // hiding UL
    this.truckDriverUL = false;

    // passing name in select's input
    this.truckInput.nativeElement.value = truckdriver.name;

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
      this.customerData.customer_job[0].customer_id,
      this.customerData.customer_job[0].farm_id
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

    // to enable submit button
    this.isFieldSelected = false;

    // assigning values in form conditionally
    if (this.role.includes('Cart Operator')) {
      // this.changeFieldFormKart.patchValue({
      //   field_id_new: field.field_id,
      // });
    }

    // clearing array
    this.allFields = of([]);
  }

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
          this.customerData.customer_job[0].customer_id,
          this.customerData.customer_job[0].farm_id
        );

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
  //#endregion

  //#region Truck ID
  // machineSearchSubscription() {
  //   this.machine_search$
  //     .pipe(
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       takeUntil(this._unsubscribeAll)
  //     )
  //     .subscribe((value: string) => {
  //       // passing for renderer2
  //       this.machineSearchValue = value;
  //       // for asterik to look required
  //       if (value === '') {
  //         this.isMachineSelected = true;
  //       }

  //       this.allMachinery = this.harvestingService.getMachinery(
  //         value,
  //         'allMotorizedVehicles'
  //       );

  //       // subscribing to show/hide machine UL
  //       this.allMachinery.subscribe((machine) => {
  //         if (machine.count === 0) {
  //           // hiding UL
  //           this.machineUL = false;
  //           this.isMachineSelected = true;
  //         } else {
  //           this.machineUL = true;
  //         }
  //       });
  //     });
  // }
  // inputClickedMachinery() {
  //   // getting the serch value to check if there's a value in input
  //   this.machine_search$
  //     .pipe(
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       takeUntil(this._unsubscribeAll)
  //     )
  //     .subscribe((v) => {
  //       this.machineSearchValue = v;
  //     });

  //   const value =
  //     this.machineSearchValue === undefined
  //       ? this.machine_name
  //       : this.machineSearchValue;

  //   // calling API
  //   this.allMachinery = this.harvestingService.getMachinery(
  //     value,
  //     'allMotorizedVehicles'
  //   );

  //   // subscribing to show/hide field UL
  //   this.allMachinery.subscribe((machinery) => {
  //     console.log('--', machinery);
  //     if (machinery.count === 0) {
  //       // hiding UL
  //       this.machineUL = false;
  //     } else {
  //       // showing UL
  //       this.machineUL = true;
  //     }
  //   });
  // }
  // listClickedMachiney(machinery) {
  //   console.log('Machinery Object:', machinery);
  //   // hiding UL
  //   this.machineUL = false;

  //   // passing name in select's input
  //   this.machineryInput.nativeElement.value = machinery.type;

  //   // to enable submit button
  //   this.isMachineSelected = false;

  //   // assigning values in form conditionally
  //   this.deliveryTicketForm.patchValue({
  //     truckId: machinery?.id,
  //   });

  //   // clearing array
  //   // this.allMachinery = of([]);
  // }
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
  console.log(job);
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

  // passing name in select's input
  this.jobInput.nativeElement.value = job.job_id;

  // passing name in job-search-value in Rendered2 for checks
  this.jobSearchValue = job.customer_name;

  // to enable submit button
  this.isJobSelected = false;

  // passing the customer id to  select farm & crop id
  // this.customerId = customer.id;

}
//#endregion


}
