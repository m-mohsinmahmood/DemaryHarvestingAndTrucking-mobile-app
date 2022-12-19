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
    customer_id:[''], // <-
    field_id: [''],
    field_name: [''],
    acres: ['',[Validators.required]],
    acres_completed: ['',[Validators.required]],
  });
  this.changeFieldFormKart = this.formBuilder.group({
    field_id: ['',[Validators.required]],
    acres_completed: ['',[Validators.required]],
  });
  this.changeFieldFormCombine = this.formBuilder.group({
    field_id: ['',[Validators.required]],
    acres: ['',[Validators.required]],
    acres_completed: ['',[Validators.required]],
  });
  this.customerFiltersForm = this.formBuilder.group({
    type: [''],
    status: [''],
  });
}
initApis(){
  this.harvestingService.getJob();
}
initObservables(){
  this.harvestingService.customer$.subscribe((res)=>{
    this.customerData = res;
    console.log(this.customerData);
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
       this.allFields = this.harvestingService.getFields(value,'customerFields',this.customerData[0].customer_id,this.customerData[0].farm_id);

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
    this.allFields = this.harvestingService.getFields('','customerFields',this.customerData[0].customer_id,this.customerData[0].farm_id);

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
    this.changeFieldFormChief.setValue({
    customer_id: this.changeFieldFormChief.get('customer_id').value,
    field_id: field.field_id,
    acres: this.changeFieldFormChief.get('acres').value,
    acres_completed: this.changeFieldFormChief.get('acres_completed').value,
    field_name: field.field_name,
  });

    // clearing array
    this.allFields = of([]);
  }
  //#endregion
  submit(){
    console.log(this.changeFieldFormChief.value);
//  this.harvestingService.changeField(this.changeFieldFormChief.value)
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
    console.log(this.changeFieldFormKart.value);
    console.log(this.changeFieldFormCombine.value);

  }

}
