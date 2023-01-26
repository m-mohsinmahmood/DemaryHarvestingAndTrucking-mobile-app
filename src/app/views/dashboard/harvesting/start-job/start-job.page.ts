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
import { Observable, of, Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-start-job',
  templateUrl: './start-job.page.html',
  styleUrls: ['./start-job.page.scss'],
})
export class StartJobPage implements OnInit {
  @ViewChild('fieldInput') fieldInput: ElementRef;
  @ViewChild('machineryInput') machineryInput: ElementRef;

  role: any;

  // Forms
  startJobFormCombine: FormGroup;
  startJobFormCrew: FormGroup;
  startJobFormKart: FormGroup;
  startJobFormTruck: FormGroup;

  // Field variables
  allFields: Observable<any>;
  field_search$ = new Subject();
  field_name: any = '';
  fieldSearchValue: any = '';
  fieldUL: any = false;
  isFieldSelected: any = true;

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

  //field name for pre-filled
  fieldName = '';
  isLoadingCustomer$: Observable<any>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private renderer: Renderer2
  ) {
    if (localStorage.getItem('role') === 'crew-chief' || localStorage.getItem('role') === 'combine-operator') {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.machineryInput.nativeElement) {
          this.allMachinery = of([]);
          this.machineUL = false; // to hide the UL
        }
      });
    }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.initForms();
    this.initApis();
    this.initObservables();

    // subscriptioln for fields
    // this.fieldSearchSubscription();
    this.machineSearchSubscription();

  }
  // async ionViewDidEnter() {
  //   this.role = localStorage.getItem('role');
  // }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
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
      workOrderId: ['']
    });
    this.startJobFormCombine = this.formBuilder.group({
      machineryId: ['', [Validators.required]],
      workOrderId: [''],
      beginning_separator_hours: ['', [Validators.required]],
      beginningEngineHours: ['', [Validators.required]],
      field_id: [''],
      field_acres: [''],
      employeeId: [''],
      field_name: ['']
    });
    this.startJobFormKart = this.formBuilder.group({
      machineryId: [''],
      job_id: [''],
      beginningEngineHours: ['', [Validators.required]],
      employeeId: ['']
    });
    this.startJobFormTruck = this.formBuilder.group({
      workOrderId: [''],
      truck_id: ['', [Validators.required]],
      crew_chief_id: [''],
      begining_odometer_miles: ['', [Validators.required]],
      employeeId: ['']
    });
  }
  initApis() {
    if (this.role === 'crew-chief') {
      this.harvestingService.getJobSetup('crew-chief', localStorage.getItem('employeeId'));
    } else if (this.role === 'combine-operator') {
      console.log(localStorage.getItem('employeeId'));
      this.harvestingService.getJobSetup('combine-operator', '', localStorage.getItem('employeeId'));
    } else if (this.role === 'kart-operator') {
      this.harvestingService.getJobTesting2('kart-operator', 'f4cfa75b-7c14-4b68-a192-00d56c9f2022');
    } else if (this.role === 'truck-driver') {
      this.harvestingService.getJobSetup('truck-driver', '', localStorage.getItem('employeeId'));
    }
  }
  initObservables() {
    this.harvestingService.customer$.subscribe((res) => {
      if (res) {
        this.customerData = res;
        console.log(this.customerData)

        // passing customer-id & farm-id to get the specific field
        this.customerID = this.customerData.customer_job[0].customer_id;
        this.farmID = this.customerData.customer_job[0].farm_id;

        // passing job id's conditionally for DWR
        if (this.role === 'crew-chief') {
          this.startJobFormCrew.patchValue({
            job_id: this.customerData.customer_job[0].job_id,
            field_id: this.customerData.customer_job[0].field_id, // passing to pre-filled
            workOrderId: this.customerData.customer_job[0].id
          });

          // passing field name for pre-filled
          this.fieldName = this.customerData.customer_job[0].field_name;

        } else if (this.role === 'kart-operator') {
          this.startJobFormKart.patchValue({
            job_id: this.customerData.customer_job[0].job_id
          });

          this.fieldName = this.customerData.customer_job[0].field_name;
          console.log('-', this.startJobFormKart.value);

        } else if (this.role === 'combine-operator') {
          this.startJobFormCombine.patchValue({
            field_name: this.customerData.customer_job[0].field_name,
            field_acres: this.customerData.customer_job[0].field_acres,
            workOrderId: this.customerData.customer_job[0].id
          });

        } else if (this.role === 'truck-driver') {
          this.startJobFormTruck.patchValue({
            workOrderId: this.customerData.customer_job[0].id,
            crew_chief_id: this.customerData.customer_job[0].crew_chief_name,
            employeeId: localStorage.getItem("employeeId")
          });
        }
      }
    });

    //Loader
    this.isLoadingCustomer$ = this.harvestingService.customerLoading$;
  }
  submit() {
    // console.log(this.startJobFormCrew.value);
    // console.log(this.startJobFormCombine.value);
    // console.log(this.startJobFormKart.value);
    // console.log(this.startJobFormTruck.value);
    // For Crew Chief
    if (localStorage.getItem('role') === 'crew-chief') {
      let data = {
        machineryId: this.startJobFormCrew.get("machineryId").value,
        employeeId: localStorage.getItem('employeeId'),
        jobId: this.startJobFormCrew.get("workOrderId").value,
        beginningEngineHours: this.startJobFormCrew.get("beginningEngineHours").value,
        beginning_separator_hours: this.startJobFormCrew.get("beginning_separator_hours").value,
      }

      this.harvestingService.createBeginingDay(data, 'harvesting')
        .subscribe((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log('RES:', res);
            this.toastService.presentToast('DWR has been created successfully', 'success');
          }
        },
          (err) => {
            console.log('Something happened :)', err);
          });
    }

    // For Combine Operator
    if (localStorage.getItem('role') === 'combine-operator') {
      let data = {
        machineryId: this.startJobFormCombine.get("machineryId").value,
        employeeId: localStorage.getItem('employeeId'),
        jobId: this.startJobFormCombine.get("workOrderId").value,
        beginningEngineHours: this.startJobFormCombine.get("beginningEngineHours").value,
        beginning_separator_hours: this.startJobFormCombine.get("beginning_separator_hours").value,
      }

      this.harvestingService.createBeginingDay(data, 'harvesting')
        .subscribe(
          (res: any) => {
            console.log('Response:', res);
            if (res.status === 200) {
              this.startJobFormCombine.reset();
              this.toastService.presentToast(res.message, 'success');
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

    // For Kart Operator
    if (localStorage.getItem('role') === 'kart-operator') {
      this.harvestingService.createBeginingDay(this.startJobFormKart.value, 'harvesting')
        .subscribe(
          (res: any) => {
            console.log('Response:', res);
            if (res.status === 200) {
              this.startJobFormCombine.reset();
              this.toastService.presentToast(res.message, 'success');
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
    if (localStorage.getItem('role') === 'truck-driver') {
      let data = {
        machineryId: this.startJobFormTruck.get("truck_id").value,
        employeeId: localStorage.getItem('employeeId'),
        jobId: this.startJobFormTruck.get("workOrderId").value,
        begining_odometer_miles: this.startJobFormTruck.get("begining_odometer_miles").value
      }
      console.log("data: ", data);

      this.harvestingService.createBeginingDay(data, 'harvesting')
        .subscribe(
          (res: any) => {
            console.log('Response:', res);
            if (res.status === 200) {
              this.startJobFormCombine.reset();
              this.toastService.presentToast(res.message, 'success');
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
          this.customerID,
          this.farmID
        );

        // subscribing to show/hide field UL
        this.allFields.subscribe((fields) => {
          if (fields.count === 0) {
            // hiding UL
            this.fieldUL = false;
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

    // calling API
    this.allFields = this.harvestingService.getFields(
      '',
      'customerFields',
      this.customerID,
      this.farmID
    );

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
    this.field_name = field.field_name;

    // to enable submit button
    this.isFieldSelected = false;

    // assigning values in form conditionally
    if (this.role === 'crew-chief') {
      this.startJobFormCrew.patchValue({
        field_id: field.field_id,
      });
    } else if (this.role === 'combine-operator') {
      // this.startJobFormCombine.patchValue({
      //   field_id: field.field_id,
      // });
    }
    else if (this.role === 'kart-operator') {
      this.startJobFormKart.patchValue({
        field_id: field.field_id,
      });
    }
    else if (this.role === 'truck-driver') {
      this.startJobFormTruck.patchValue({
        field_id: field.field_id
      });
    }

    // clearing array
    this.allFields = of([]);
  }
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
        this.allMachinery = this.harvestingService.getMachinery(
          value,
          'allMotorizedVehicles'
        );

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
    this.allMachinery = this.harvestingService.getMachinery(
      value,
      'allMotorizedVehicles'
    );

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
    this.machine_name = machinery.type;

    // to enable submit button
    this.isMachineSelected = false;

    // assigning values in form conditionally
    if (this.role === 'crew-chief') {
      this.startJobFormCrew.patchValue({
        machineryId: machinery.id
      });
    } else if (this.role === 'combine-operator') {
      this.startJobFormCombine.patchValue({
        machineryId: machinery.id
      });
    }
    else if (this.role === 'kart-operator') {
      this.startJobFormKart.patchValue({
        machineryId: machinery.id
      });
    }
    else if (this.role === 'truck-driver') {
      this.startJobFormTruck.patchValue({
        truck_id: machinery.id
      });
    }

    // clearing array
    this.allMachinery = of([]);
  }
  //#endregion
}
