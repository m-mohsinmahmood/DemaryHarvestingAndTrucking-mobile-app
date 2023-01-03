/* eslint-disable max-len */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-change-field',
  templateUrl: './change-field.page.html',
  styleUrls: ['./change-field.page.scss'],
})
export class ChangeFieldPage implements OnInit {
role: any;
changeFieldFormChief: FormGroup;
changeFieldFormKart: FormGroup;
changeFieldFormCombine: FormGroup;

 // filters form
 customerFiltersForm: FormGroup;

// observables
  allCustomers: Observable<any>;
  allFields: Observable<any>;

    // subjects
  customer_search$ = new Subject();
  field_search$ = new Subject();

    // input values
  customer_name: any = '';
  field_name: any = '';

   // input's search values
  customerSearchValue: any;
  fieldSearchValue: any = '';

   // to show UL's
  customerUL: any = false;
  fieldUL: any = false;

  // for invalid
  isCustomerSelected: any = true;
  isFieldSelected: any = true;

  // selected customer id to select field
  customerID: any;

  // selected farm id to select fields
  farmID: any;

  // Profile variables
  customerData: any;
  isLoading: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


constructor(
  private formBuilder: FormBuilder,
  private location: Location,
  private harvestingService: HarvestingService,
  private toastService: ToastService


) { }

ngOnInit() {
  this.role = localStorage.getItem('role');


  this.initForms();
  this.initApis();
  this.initObservables();
}

ngOnDestroy(): void {
  this._unsubscribeAll.next(null);
  this._unsubscribeAll.complete();
}
initForms(){
  this.changeFieldFormChief = this.formBuilder.group({
    employee_id: [''],
    customer_id:[''], // <-
    field_id: [''],
    field_name: [''],
    acres: ['',[Validators.required]],
    acres_completed: ['',[Validators.required]],
  });
  this.changeFieldFormKart = this.formBuilder.group({
    employee_id: ['f4cfa75b-7c14-4b68-a192-00d56c9f2022'],
    customer_id: [''],
    state: [''],
    farm_id: [''],
    crop_id: [''],
    field_id: [''],
    field_id_new: [''],
    total_gps_acres: ['',[Validators.required]],
    is_field_changed: [true],
    has_employee:[false]
  });
  this.changeFieldFormCombine = this.formBuilder.group({
    employee_id: [''],
    field_id: ['',[Validators.required]],
    acres: ['',[Validators.required]],
    acres_completed: ['',[Validators.required]],
  });
  this.customerFiltersForm = this.formBuilder.group({
    type: [''],
    status: [''],
  });
}
initApis() {
  if(this.role === 'crew-chief'){
    this.harvestingService.getJobTesting2('crew-chief','8920a566-003c-47f0-82dc-21e74196bb98');
  }else if(this.role === 'combine-operator'){
    this.harvestingService.getJobTesting2('combine-operator','3ac2db42-d0c1-4493-a0cf-b19deb834f46');
  }else if(this.role === 'kart-operator'){
    this.harvestingService.getJobTesting2('kart-operator','f4cfa75b-7c14-4b68-a192-00d56c9f2022');
  }else if(this.role === 'truck-driver'){
    this.harvestingService.getJobTesting2('truck-driver','edbce4de-bee6-40f9-b720-9ccf230bb3af');
  }
}
initObservables(){
  this.harvestingService.customer$.subscribe((res)=>{
    console.log('res::',res);
    if(res){
      this.customerData = res;
      console.log('--',this.customerData.customer_job.length);

      this.changeFieldFormKart.patchValue({
        customer_id: this.customerData.customer_job[0].customer_id,
        state: this.customerData.customer_job[0].state,
        farm_id: this.customerData.customer_job[0].farm_id,
        crop_id: this.customerData.customer_job[0].crop_id,
        field_id: this.customerData.customer_job[0].field_id,
        has_employee: this.customerData.customer_job[0].has_employee,
      });
    }
  });
  this.harvestingService.customerLoading$.subscribe((val)=>{
    this.isLoading = val;
  });
}

  goBack(){
    this.location.back();
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
        if(value === ''){ this.isFieldSelected = true;}

       // calling API
       this.allFields = this.harvestingService.getFields(value,'customerFields',this.customerData.customer_job[0].customer_id,this.customerData.customer_job[0].farm_id);

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

    // calling API // need id to check
    this.allFields = this.harvestingService.getFields(value,'customerFields',this.customerData.customer_job[0].customer_id,this.customerData.customer_job[0].farm_id);

          // subscribing to show/hide field UL
          this.allFields.subscribe((fields) => {
            console.log('first',fields);
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

    // assigning values in form conditionally
    if(this.role === 'crew-chief'){
      this.changeFieldFormChief.setValue({
      customer_id: this.changeFieldFormChief.get('customer_id').value,
      field_id: field.field_id,
      acres: this.changeFieldFormChief.get('acres').value,
      acres_completed: this.changeFieldFormChief.get('acres_completed').value,
      field_name: field.field_name,
    });
    }else if(this.role === 'kart-operator'){
this.changeFieldFormKart.patchValue({
  field_id_new: field.field_id,
});
    }

    // clearing array
    this.allFields = of([]);
  }
  //#endregion
  submit(){
    console.log(this.changeFieldFormChief.value);
    console.log(this.changeFieldFormKart.value);
    console.log(this.changeFieldFormKart.value);
    console.log(this.changeFieldFormCombine.value);
if(this.role === 'crew-chief'){
  this.harvestingService.changeField(this.changeFieldFormChief.value)
  .subscribe(
   (res: any) => {
       console.log('Response Change Field:',res);
       if(res.status === 200){
         this.changeFieldFormChief.reset();
         this.toastService.presentToast(res.message,'success');
       }else{
         console.log('Something happened :)');
         this.toastService.presentToast(res.mssage,'danger');
       }
     },
   (err) => {
     this.toastService.presentToast(err,'danger');
     console.log('Error:',err);
   },
  );
}
else if(this.role === 'kart-operator'){
  this.harvestingService.changeField(this.changeFieldFormKart.value)
  .subscribe(
   (res: any) => {
       console.log('Response Change Field:',res);
       if(res.status === 200){
         this.changeFieldFormKart.reset();
         this.toastService.presentToast(res.message,'success');
       }else{
         console.log('Something happened :)');
         this.toastService.presentToast(res.mssage,'danger');
       }
     },
   (err) => {
     this.toastService.presentToast(err,'danger');
     console.log('Error:',err);
   },
  );
}


  }

}
