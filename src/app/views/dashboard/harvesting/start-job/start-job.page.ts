/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { AlertService } from 'src/app/alert/alert.service';
import { Alert } from 'src/app/alert/alert.model';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-job',
  templateUrl: './start-job.page.html',
  styleUrls: ['./start-job.page.scss'],
})
export class StartJobPage implements OnInit {
  // @ViewChild('fieldInput') fieldInput: ElementRef;
  @ViewChild('machineryInput') machineryInput: ElementRef;
  @ViewChild('jobInput') jobInput: ElementRef;

  role: any;

  // Forms
  startJobFormCombine: FormGroup;
  startJobFormCrew: FormGroup;
  startJobFormKart: FormGroup;
  startJobFormTruck: FormGroup;

  // Field variables
  // allFields: Observable<any>;
  // field_search$ = new Subject();
  // field_name: any = '';
  // fieldSearchValue: any = '';
  // fieldUL: any = false;
  // isFieldSelected: any = true;

  // job variables
  allJobs: Observable<any>;
  job_search$ = new Subject();
  job_name: any = '';
  jobSearchValue: any = '';
  jobUL: any = false;
  isJobSelected: any = true;

  // machinery variables
  allMachinery: Observable<any>;
  machine_search$ = new Subject();
  machine_name: any = '';
  machineSearchValue: any = '';
  machineUL: any = false;
  isMachineSelected: any = true;

  // selected customer id to select farms & crops
  customerID: any;

  // selected farm id to select fields
  farmID: any;

  alertInfo: Alert = null;
  showAlert = false;

  customerData: any;
  add_location_overlay = true;
  sub;
  //field name for pre-filled
  fieldName = '';
  isLoadingCustomer$;

  customerName;
  state;
  farm;
  crop;
  crewChiefName;
  date;
  truck_driver_name;

  public loadingSpinner = new BehaviorSubject(false);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService,
    private renderer: Renderer2,
    private router: Router
  ) {
    if (localStorage.getItem('role').includes('Crew Chief') || localStorage.getItem('role').includes('Combine Operator')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.machineryInput.nativeElement) {
          this.allMachinery = of([]);
          this.machineUL = false; // to hide the UL
        }
        else if (e.target !== this.jobInput.nativeElement) {
          this.allJobs = of([]);
          this.jobUL = false; // to hide the UL
        }
      });
    }
  }

  ngOnInit() {
    console.log("Start Job Page 1");

    this.role = localStorage.getItem('role');
    this.truck_driver_name = localStorage.getItem('employeeName');

    this.initForms();
    // this.initApis();
    // this.initObservables();

    // subscriptioln for fields
    // this.fieldSearchSubscription();
    this.machineSearchSubscription();
    this.jobSearchSubscription();

  }
  // async ionViewDidEnter() {
  //   this.role = localStorage.getItem('role');
  // }

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
    // this.sub.unsubscribe();
    // this.isLoadingCustomer$.unsubscribe();

  }

  goBack() {
    this.location.back();
  }

  initForms() {
    this.startJobFormCrew = this.formBuilder.group({
      machineryId: ['', [Validators.required]],
      beginning_separator_hours: ['', [Validators.required]],
      beginningEngineHours: ['', [Validators.required]],
      field_id: [''],
      employeeId: [''],
      job_id: ['']
    });
    this.startJobFormCombine = this.formBuilder.group({
      machineryId: ['', [Validators.required]],
      beginning_separator_hours: ['', [Validators.required]],
      beginningEngineHours: ['', [Validators.required]],
      employeeId: [localStorage.getItem('employeeId')],
      customer_id: [''],
      state: [''],
      farm_id: [''],
      crop_id: [''],
      crew_chief_id: [''],
      jobId: ['']
    });
    this.startJobFormKart = this.formBuilder.group({
      machineryId: [''],
      // job_id: [''],
      beginningEngineHours: ['', [Validators.required]],
      employeeId: [localStorage.getItem('employeeId')],
      customer_id: [''],
      state: [''],
      farm_id: [''],
      crop_id: [''],
      crew_chief_id: [''],
      jobId: ['']
    });
    this.startJobFormTruck = this.formBuilder.group({
      workOrderId: [''],
      truck_id: ['', [Validators.required]],
      begining_odometer_miles: ['', [Validators.required]],
      employeeId: [localStorage.getItem('employeeId')],
      customer_id: [''],
      state: [''],
      farm_id: [''],
      crop_id: [''],
      crew_chief_id: [''],
      jobId: ['']
    });
  }

  initApis() {
    if (this.role.includes('Crew Chief')) {
      this.harvestingService.getJobSetup('Crew Chief', localStorage.getItem('employeeId'));
    } else if (this.role.includes('Combine Operator')) {
      this.harvestingService.getJobSetup('Combine Operator', '', localStorage.getItem('employeeId'));
    } else if (this.role.includes('Cart Operator')) {

      let crew_chief_id = '';
      this.harvestingService.getKartOperatorCrewChief('getKartOpCrewChief', localStorage.getItem('employeeId')).subscribe(param => {
        crew_chief_id = param[0].id;

        this.harvestingService.getJobSetup(
          'Cart Operator',
          crew_chief_id,
          localStorage.getItem('employeeId')
        );
      });

    } else if (this.role.includes('Truck Driver')) {
      this.harvestingService.getJobSetup('Truck Driver', '', localStorage.getItem('employeeId'));
    }

  }

  initObservables() {
    this.sub = this.harvestingService.customerJobSetup$.subscribe((res) => {
      if (res) {

        this.customerData = res;
        console.log('-', this.customerData);
        // passing customer-id & farm-id to get the specific field
        this.customerID = this.customerData?.customer_job[0]?.customer_id;
        this.farmID = this.customerData?.customer_job[0]?.farm_id;

        // passing job id's conditionally for DWR
        if (this.role.includes('Crew Chief')) {
          this.startJobFormCrew.patchValue({
            job_id: this.customerData.customer_job[0]?.job_id,
            field_id: this.customerData.customer_job[0]?.field_id, // passing to pre-filled
            workOrderId: this.customerData.customer_job[0]?.id,
          });
          // passing field name for pre-filled
          this.fieldName = this.customerData.customer_job[0]?.field_name;
        }

        else if (this.role.includes('Cart Operator')) {
          console.log("current job id: ", this.customerData.customer_job[0]?.id);

          this.startJobFormKart.patchValue({
            job_id: this.customerData.customer_job[0]?.id,
            employeeId: localStorage.getItem('employeeId'),
          });
          this.fieldName = this.customerData.customer_job[0]?.field_name;
          // console.log('-', this.startJobFormKart.value);
        }

        else if (this.role.includes('Combine Operator')) {
          this.startJobFormCombine.patchValue({
            field_name: this.customerData.customer_job[0]?.field_name,
            field_acres: this.customerData.customer_job[0]?.field_acres,
            workOrderId: this.customerData.customer_job[0]?.id,
          });
        }

        else if (this.role.includes('Truck Driver')) {
          this.startJobFormTruck.patchValue({
            workOrderId: this.customerData.customer_job[0]?.id,
            crew_chief_id: this.customerData.customer_job[0]?.crew_chief_name,
            employeeId: localStorage.getItem('employeeId'),
          });
        }
      }
    });

    //Loader
    this.isLoadingCustomer$ = this.harvestingService.customerLoading$;
  }
  submit() {
    // For Crew Chief
    if (localStorage.getItem('role').includes('Crew Chief')) {
      const data = {
        machineryId: this.startJobFormCrew.get('machineryId').value,
        employeeId: localStorage.getItem('employeeId'),
        jobId: this.startJobFormCrew.get('workOrderId').value,
        beginningEngineHours: this.startJobFormCrew.get('beginningEngineHours').value,
        beginning_separator_hours: this.startJobFormCrew.get('beginning_separator_hours').value,
      };
      this.loadingSpinner.next(true);
      this.harvestingService.createBeginingDay(data, 'harvesting')
        .subscribe((res) => {
          console.log(res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);
            console.log('RES:', res);
            this.toastService.presentToast('DWR has been created successfully', 'success');

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');
          }
        },
          (err) => {
            console.log('Something happened :)', err);
          });
    }

    // For Combine Operator
    else if (localStorage.getItem('role').includes('Combine Operator')) {
      // const data = {
      //   machineryId: this.startJobFormCombine.get('machineryId').value,
      //   employeeId: localStorage.getItem('employeeId'),
      //   jobId: this.startJobFormCombine.get('workOrderId').value,
      //   beginningEngineHours: this.startJobFormCombine.get('beginningEngineHours').value,
      //   beginning_separator_hours: this.startJobFormCombine.get('beginning_separator_hours').value,
      // };
      this.loadingSpinner.next(true);
      this.harvestingService.createBeginingDay(this.startJobFormCombine.value, 'harvesting')
        .subscribe(
          (res: any) => {
            console.log('Response:', res);
            if (res.status === 200) {
              this.loadingSpinner.next(false);
              this.startJobFormCombine.reset();
              this.toastService.presentToast(res.message, 'success');

              // navigating
              this.router.navigateByUrl('/tabs/home/harvesting');
            } else {
              console.log('Something happened :)');
              this.toastService.presentToast('DWR has been created successfully', 'success');
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
            console.log('Error:', err);
          },
        );
    }

    // For Cart Operator
    else if (localStorage.getItem('role').includes('Cart Operator')) {
      // console.log(this.startJobFormKart.get('job_id').value);

      // const data = {
      //   machineryId: this.startJobFormKart.get('machineryId').value,
      //   employeeId: localStorage.getItem('employeeId'),
      //   jobId: this.startJobFormKart.get('job_id').value,
      //   beginningEngineHours: this.startJobFormKart.get('beginningEngineHours').value,
      // };

      this.loadingSpinner.next(true);
      this.harvestingService.createBeginingDay(this.startJobFormKart.value, 'harvesting')
        .subscribe(
          (res: any) => {
            // console.log('Response:', res);
            if (res.status === 200) {
              this.loadingSpinner.next(false);
              this.startJobFormCombine.reset();
              // this.location.back();
              this.router.navigateByUrl('/tabs/home/harvesting');
              this.toastService.presentToast(res.message, 'success');

              // navigating
              this.router.navigateByUrl('/tabs/home/harvesting');
            } else {
              console.log('Something happened :)');
              this.toastService.presentToast('DWR has been created successfully', 'success');
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
            console.log('Error:', err);
          },
        );
    }

    // For Truck Driver
    else if (localStorage.getItem('role').includes('Truck Driver')) {

      this.harvestingService.updateBeginningOfDayJobSetup({
        jobId: this.startJobFormTruck.get('workOrderId').value,
        role: 'Truck Driver',
        operation: "beginningOfDay"
      })
        .subscribe(
          (res: any) => {
            console.log('Response:', res);
            if (res.status === 200) {
            } else {
              console.log('Something happened :)');
              this.toastService.presentToast('DWR has been created successfully', 'success');
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
            console.log('Error:', err);
          },
        );

      const data = {
        machineryId: this.startJobFormTruck.get('truck_id').value,
        employeeId: localStorage.getItem('employeeId'),
        jobId: this.startJobFormTruck.get('workOrderId').value,
        begining_odometer_miles: this.startJobFormTruck.get('begining_odometer_miles').value
      };
      console.log('data: ', data);
      this.loadingSpinner.next(true);
      this.harvestingService.createBeginingDay(data, 'harvesting')
        .subscribe(
          (res: any) => {
            console.log('Response:', res);
            if (res.status === 200) {
              this.loadingSpinner.next(false);

              this.startJobFormCombine.reset();
              this.toastService.presentToast(res.message, 'success');

              // navigating
              this.router.navigateByUrl('/tabs/home/harvesting');
            } else {
              console.log('Something happened :)');
              this.toastService.presentToast('DWR has been created successfully', 'success');
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
            console.log('Error:', err);
          },
        );
    }
  }
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
  //       if (value === '') {
  //         this.isFieldSelected = true;
  //       }

  //       // calling API
  //       this.allFields = this.harvestingService.getFields(
  //         value,
  //         'customerFields',
  //         this.customerID,
  //         this.farmID
  //       );

  //       // subscribing to show/hide field UL
  //       this.allFields.subscribe((fields) => {
  //         if (fields.count === 0) {
  //           // hiding UL
  //           this.fieldUL = false;
  //           this.isFieldSelected = true;
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
  //   this.allFields = this.harvestingService.getFields(
  //     '',
  //     'customerFields',
  //     this.customerID,
  //     this.farmID
  //   );

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
  //   this.fieldInput.nativeElement.value = field.field_name;

  //   // to enable submit button
  //   this.isFieldSelected = false;

  //   // assigning values in form conditionally
  //   if (this.role.includes('Crew Chief')) {
  //     this.startJobFormCrew.patchValue({
  //       field_id: field.field_id,
  //     });
  //   }

  //   else if (this.role.includes('Cart Operator')) {
  //     this.startJobFormKart.patchValue({
  //       field_id: field.field_id
  //     });
  //   }
  //   else if (this.role.includes('Truck Driver')) {
  //     this.startJobFormTruck.patchValue({
  //       field_id: field.field_id
  //     });
  //   }

  //   // clearing array
  //   this.allFields = of([]);
  // }
  //#endregion
  //#region Machinery
  machineSearchSubscription() {
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.machineSearchValue = value;
        // for asterik to look required
        if (value === '') {
          this.isMachineSelected = true;
        }

        // calling API
        // this.allFields = this.harvestingService.getFields(
        //   value,
        //   'customerFields',
        //   this.customerID,
        //   this.farmID
        // );

        if (this.role.includes('Combine Operator')) {
          this.allMachinery = this.harvestingService.getMachinery(
            value,
            'allMachinery',
            'Combine'
          );
        }
        else if (this.role.includes('Cart Operator')) {
          this.allMachinery = this.harvestingService.getMachinery(
            value,
            'allMachinery',
            'Combine'
          );
        }
        else if (this.role.includes('Truck Driver')) {
          this.allMachinery = this.harvestingService.getMachinery(
            value,
            'allMotorizedVehicles',
            'Truck IFTA'
          );
        }

        // subscribing to show/hide machine UL
        this.allMachinery.subscribe((machine) => {
          if (machine.count === 0) {
            // hiding UL
            this.machineUL = false;
            this.isMachineSelected = true;
          } else {
            this.machineUL = true;
          }
        });
      });
  }
  inputClickedMachinery() {
    // getting the serch value to check if there's a value in input
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.machineSearchValue = v;
      });

    const value =
      this.machineSearchValue === undefined
        ? this.machine_name
        : this.machineSearchValue;

    // calling API

    if (this.role.includes('Combine Operator')) {
      this.allMachinery = this.harvestingService.getMachinery(
        value,
        'allMachinery',
        'Combine'
      );
    }
    else if (this.role.includes('Cart Operator')) {
      this.allMachinery = this.harvestingService.getMachinery(
        value,
        'allMachinery',
        'Combine'
      );
    }
    else if (this.role.includes('Truck Driver')) {
      this.allMachinery = this.harvestingService.getMachinery(
        value,
        'allMotorizedVehicles',
        'Truck IFTA'
      );
    }

      // subscribing to show/hide field UL
      this.allMachinery.subscribe((machinery) => {
        console.log('--', machinery);
        if (machinery.count === 0) {
          // hiding UL
          this.machineUL = false;
        } else {
          // showing UL
          this.machineUL = true;
        }
      });
    }
    listClickedMachiney(machinery) {
      console.log('Machinery Object:', machinery);
      // hiding UL
      this.machineUL = false;

      // passing name in select's input
      this.machineryInput.nativeElement.value = machinery.name;

      // to enable submit button
      this.isMachineSelected = false;

      // assigning values in form conditionally
      if (this.role.includes('Crew Chief')) {
        this.startJobFormCrew.patchValue({
          machineryId: machinery.id,
          beginningEngineHours: machinery.odometer_reading_end
        });
      } else if (this.role.includes('Combine Operator')) {
        this.startJobFormCombine.patchValue({
          machineryId: machinery.id,
          beginningEngineHours: machinery.odometer_reading_end,
          beginning_separator_hours:machinery.separator_hours
        });
      }
      else if (this.role.includes('Cart Operator')) {
        this.startJobFormKart.patchValue({
          machineryId: machinery.id,
          beginningEngineHours: machinery.odometer_reading_end,
          beginning_separator_hours:machinery.separator_hours
        });
      }
      else if (this.role.includes('Truck Driver')) {
        this.startJobFormTruck.patchValue({
          truck_id: machinery.id,
          begining_odometer_miles: machinery.odometer_reading_end
        });
      }

      // clearing array
      this.allMachinery = of([]);
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
      console.log(job);
      // hiding UL
      this.jobUL = false;

      // patching for Combine Operator
      if (localStorage.getItem('role').includes('Combine Operator')) {
        this.startJobFormCombine.patchValue({
          jobId: job.job_id,
          crop_id: job.crop_id,
          customer_id: job.customer_id,
          farm_id: job.farm_id,
          state: job.state,
          crew_chief_id: job.crew_chief_id,
        });
      }

      // patching for Cart Operator
      else if (localStorage.getItem('role').includes('Cart Operator')) {
        this.startJobFormKart.patchValue({
          jobId: job.job_id,
          crop_id: job.crop_id,
          customer_id: job.customer_id,
          farm_id: job.farm_id,
          state: job.state,
          crew_chief_id: job.crew_chief_id,

        });
      }

      // patching for Cart Operator
      else if (localStorage.getItem('role').includes('Truck Driver')) {
        this.startJobFormTruck.patchValue({
          jobId: job.job_id,
          crop_id: job.crop_id,
          customer_id: job.customer_id,
          farm_id: job.farm_id,
          state: job.state,
          crew_chief_id: job.crew_chief_id,

        });
      }

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

    }
    //#endregion
  }

