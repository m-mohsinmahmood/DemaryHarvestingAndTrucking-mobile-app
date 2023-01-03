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

  isLoadingCustomer$:  Observable<any>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private renderer: Renderer2
  ) {
    if(localStorage.getItem('role') === 'crew-chief' || localStorage.getItem('role') === 'combine-operator'){
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.fieldInput.nativeElement) {
          this.allFields = of([]);
          this.fieldUL = false; // to hide the UL
        }
        else if (e.target !== this.machineryInput.nativeElement) {
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
       this.fieldSearchSubscription();
       this.machineSearchSubscription();

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  goBack() {
    this.location.back();
  }
  initApis() {
    if(this.role === 'crew-chief'){
      this.harvestingService.getJobTesting('crew-chief');
    }else if(this.role === 'combine-operator'){
      this.harvestingService.getJobTesting('combine-operator');
    }else if(this.role === 'kart-operator'){
      this.harvestingService.getJobTesting('kart-operator');
    }else if(this.role === 'truck-driver'){
      // this.harvestingService.getJobTesting('truck-driver');
    }
  }
  initObservables() {
    this.harvestingService.customer$.subscribe((res) => {
      if(res){
        this.customerData = res;

        // passing customer-id & farm-id to get the specific field
        this.customerID = this.customerData.customer_job[0].customer_id;
        this.farmID = this.customerData.customer_job[0].farm_id;
      }
    });

    //Loader
    this.isLoadingCustomer$ = this.harvestingService.customerLoading$;
  }
  initForms() {
    this.startJobFormCrew = this.formBuilder.group({
      machineryId: ['', [Validators.required]],
      beginning_separator_hours: ['', [Validators.required]],
      beginningEngineHours: ['', [Validators.required]],
      field_id: [''],
      employeeId: ['2bf46542-d0bb-4ada-96e6-c103853c3f0d'],
    });
    this.startJobFormCombine = this.formBuilder.group({
      machineryId: [''],
      beginning_separator_hours: ['', [Validators.required]],
      beginningEngineHours: ['', [Validators.required]],
      field_id: [''],
      field_acres: ['', [Validators.required]],
      employeeId: ['e4d3e774-fade-4603-93ba-c03ef6f6c150'],

    });
    this.startJobFormKart = this.formBuilder.group({
      machineryId: [''],
      beginningEngineHours: ['', [Validators.required]],
      employeeId: ['daea0b53-f5f5-4d0e-ac6b-1175542f74b0'],

    });
    this.startJobFormTruck = this.formBuilder.group({
      truck_id: ['', [Validators.required]],
      crew_chief_id: ['1a4d594b-726c-46e4-b677-5e4a78adbc1e'],
      truck_company: ['', [Validators.required]],
      begining_odometer_miles: ['', [Validators.required]],
      employeeId: ['2bf46542-d0bb-4ada-96e6-c103853c3f0d'],

    });
  }
  submit() {
    console.log(this.startJobFormCrew.value);
    console.log(this.startJobFormCombine.value);
    console.log(this.startJobFormKart.value);
    console.log(this.startJobFormTruck.value);
        // For Crew Chief
        if(localStorage.getItem('role') === 'crew-chief'){
          this.harvestingService.createBeginingDay(this.startJobFormCrew.value, 'harvesting')
          .subscribe((res)=>{
            console.log(res);
            if(res.status === 200){
              console.log('RES:',res);
              this.toastService.presentToast('DWR has been created successfully','success');
            }
          },
          (err)=>{
            console.log('Something happened :)',err);
          });
        }

         // For Combine Operator
    if(localStorage.getItem('role') === 'combine-operator'){
      this.harvestingService.createBeginingDay(this.startJobFormCombine.value,'harvesting')
      .subscribe(
        (res: any) => {
            console.log('Response:',res);
            if(res.status === 200){
              this.startJobFormCombine.reset();
              this.toastService.presentToast(res.message,'success');
            }else{
              console.log('Something happened :)');
              this.toastService.presentToast('DWR has been created successfully','success');
            }
          },
        (err) => {
          this.toastService.presentToast(err,'danger');
          console.log('Error:',err);
        },
    );
    }

        // For Kart Operator
        if(localStorage.getItem('role') === 'kart-operator'){
          this.harvestingService.createBeginingDay(this.startJobFormKart.value,'harvesting')
          .subscribe(
            (res: any) => {
                console.log('Response:',res);
                if(res.status === 200){
                  this.startJobFormCombine.reset();
                  this.toastService.presentToast(res.message,'success');
                }else{
                  console.log('Something happened :)');
                  this.toastService.presentToast('DWR has been created successfully','success');
                }
              },
            (err) => {
              this.toastService.presentToast(err,'danger');
              console.log('Error:',err);
            },
        );
        }

        // For Truck Driver
    if(localStorage.getItem('role') === 'truck-driver'){
      this.harvestingService.createBeginingDay(this.startJobFormTruck.value,'harvesting')
      .subscribe(
        (res: any) => {
            console.log('Response:',res);
            if(res.status === 200){
              this.startJobFormCombine.reset();
              this.toastService.presentToast(res.message,'success');
            }else{
              console.log('Something happened :)');
              this.toastService.presentToast('DWR has been created successfully','success');
            }
          },
        (err) => {
          this.toastService.presentToast(err,'danger');
          console.log('Error:',err);
        },
    );
    }


    // For Crew Chief
    // if(localStorage.getItem('role') === 'crew-chief'){
    //   this.harvestingService.startJob(this.startJobFormCrew.value)
    //   .subscribe(
    //     (res: any) => {
    //         console.log('Response:',res);
    //         if(res.status === 200){
    //           this.startJobFormCrew.reset();
    //           this.toastService.presentToast(res.message,'success');
    //         }else{
    //           console.log('Something happened :)');
    //           this.toastService.presentToast(res.mssage,'danger');
    //         }
    //       },
    //     (err) => {
    //       this.toastService.presentToast(err,'danger');
    //       console.log('Error:',err);
    //     },
    // );
    // }

    // // For Combine Operator
    // if(localStorage.getItem('role') === 'combine-operator'){
    //   this.harvestingService.startJob(this.startJobFormCombine.value)
    //   .subscribe(
    //     (res: any) => {
    //         console.log('Response:',res);
    //         if(res.status === 200){
    //           this.startJobFormCombine.reset();
    //           this.toastService.presentToast(res.message,'success');
    //         }else{
    //           console.log('Something happened :)');
    //           this.toastService.presentToast(res.mssage,'danger');
    //         }
    //       },
    //     (err) => {
    //       this.toastService.presentToast(err,'danger');
    //       console.log('Error:',err);
    //     },
    // );
    // }

    // // For Kart Operator
    // if(localStorage.getItem('role') === 'kart-operator'){
    //   this.harvestingService.startJob(this.startJobFormKart.value)
    //   .subscribe(
    //     (res: any) => {
    //         console.log('Response:',res);
    //         if(res.status === 200){
    //           this.startJobFormKart.reset();
    //           this.toastService.presentToast(res.message,'success');
    //         }else{
    //           console.log('Something happened :)');
    //           this.toastService.presentToast(res.mssage,'danger');
    //         }
    //       },
    //     (err) => {
    //       this.toastService.presentToast(err,'danger');
    //       console.log('Error:',err);
    //     },
    // );
    // }

    //  // For Truck Driver
    //  if(localStorage.getItem('role') === 'truck-driver'){
    //   this.harvestingService.startJob(this.startJobFormTruck.value)
    //   .subscribe(
    //     (res: any) => {
    //         console.log('Response:',res);
    //         if(res.status === 200){
    //           this.startJobFormTruck.reset();
    //           this.toastService.presentToast(res.message,'success');
    //         }else{
    //           console.log('Something happened :)');
    //           this.toastService.presentToast(res.mssage,'danger');
    //         }
    //       },
    //     (err) => {
    //       this.toastService.presentToast(err,'danger');
    //       console.log('Error:',err);
    //     },
    // );
    // }
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
      this.startJobFormCombine.patchValue({
        field_id: field.field_id,
      });
    }
    else if (this.role === 'kart-operator') {
      this.startJobFormKart.patchValue({
        field_id: field.field_id,
      });
    }
    else if (this.role === 'truck-driver') {
      this.startJobFormTruck.patchValue({
        field_id: field.field_id,
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
          'allMachinery'
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
      'allMachinery'
    );

    // subscribing to show/hide field UL
    this.allMachinery.subscribe((machinery) => {
      console.log('--',machinery);
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
    this.machine_name = machinery.name;

    // to enable submit button
    this.isMachineSelected = false;

    // assigning values in form conditionally
    if(this.role === 'crew-chief'){
      this.startJobFormCrew.patchValue({
        machineryId: machinery.id
      });
    }else if(this.role === 'combine-operator'){
      this.startJobFormCombine.patchValue({
        machineryId: machinery.id
      });
    }
    else if(this.role === 'kart-operator'){
      this.startJobFormKart.patchValue({
        machineryId: machinery.id
      });
    }
    else if(this.role === 'truck-driver'){
      this.startJobFormTruck.patchValue({
        machineryId: machinery.id
      });
    }

    // clearing array
    this.allMachinery = of([]);
  }
  //#endregion
}
