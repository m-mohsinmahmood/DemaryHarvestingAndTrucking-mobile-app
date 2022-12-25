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
          // console.log('Field');
          this.allFields = of([]);
          this.fieldUL = false; // to hide the UL
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
    this.harvestingService.getJob();
  }
  initObservables() {
    this.harvestingService.customer$.subscribe((res) => {
      if(res){
        this.customerData = res;

        // passing customer-id & farm-id to get the specific field
        this.customerID = this.customerData.customer_job[5].customer_id;
        this.farmID = this.customerData.customer_job[5].farm_id;
      }
    });

    //Loader
    this.isLoadingCustomer$ = this.harvestingService.customerLoading$;
  }
  initForms() {
    this.startJobFormCrew = this.formBuilder.group({
      type: ['harvesting'],
      role: [localStorage.getItem('role')],
      machine_id: ['', [Validators.required]],
      separator_hours: ['', [Validators.required]],
      engine_hours: ['', [Validators.required]],
      field_id: [''],
    });
    this.startJobFormCombine = this.formBuilder.group({
      type: ['harvesting'],
      role: [localStorage.getItem('role')],
      machine_id: ['', [Validators.required]],
      separator_hours: ['', [Validators.required]],
      engine_hours: ['', [Validators.required]],
      field_id: [''],
    });
    this.startJobFormKart = this.formBuilder.group({
      type: ['harvesting'],
      role: [localStorage.getItem('role')],
      machine_id: ['', [Validators.required]],
      engine_hours: ['', [Validators.required]],
    });
    this.startJobFormTruck = this.formBuilder.group({
      type: ['harvesting'],
      role: [localStorage.getItem('role')],
      truck_id: ['', [Validators.required]],
      crew_chief: ['', [Validators.required]],
      truck_company: ['', [Validators.required]],
      begining_miles: ['', [Validators.required]],
    });
  }
  submit() {
    console.log(this.startJobFormCrew.value);
    console.log(this.startJobFormCombine.value);
    console.log(this.startJobFormKart.value);
    console.log(this.startJobFormTruck.value);

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

    // assigning values in form
    this.startJobFormCrew.patchValue({
      field_id: field.field_id
    });

    // clearing array
    this.allFields = of([]);
  }
  //#endregion
}
