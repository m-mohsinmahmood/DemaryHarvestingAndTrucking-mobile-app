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

    // subjects
  customer_search$ = new Subject();

    // input values
  customer_name: any = '';

   // input's search values
  customerSearchValue: any;

   // to show UL's
  customerUL: any = false;

    // for invalid
  isCustomerSelected: any = true;

  // selected customer id to select field
  customerID: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();


constructor(
  private formBuilder: FormBuilder,
  private location: Location,
  private harvestingService: HarvestingService,
  private toastService: ToastService


) { }

ngOnInit() {
  this.role = localStorage.getItem('role');


  this.changeFieldFormChief = this.formBuilder.group({
    customer_id:['', [Validators.required]], // <-
    field_id: ['',[Validators.required]],
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

ngOnDestroy(): void {
  this._unsubscribeAll.next(null);
  this._unsubscribeAll.complete();
}

  goBack(){
    this.location.back();
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


        this.allCustomers = this.harvestingService.getCustomers('allCustomers');
        // showing UL
        this.customerUL = true;

        // subscribing to disable & enable farm, crop inputs
        // this.allCustomers.subscribe((customers) => {
        //   // this.isDisabled = customers.count === 0 ? true : false;
        //   if (customers.count === 0) {
        //     this.isDisabled = true;

        //     // clearing the input values in farm, crop after getting disabled
        //     this.farm_name = '';
        //     this.crop_name = '';

        //     // hiding UL
        //     this.customerUL = false;
        //   } else {
        //     this.isDisabled = false;
        //   }
        // });
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
    this.allCustomers = this.harvestingService.getCustomers('allCustomers');


    // subscribing to disable & enable farm, crop inputs
    // this.allCustomers.subscribe((customers) => {
    //   // this.isDisabled = customers.count === 0 ? true : false;
    //   if (customers.count === 0) {
    //     this.isDisabled = true;

    //     // clearing the input values in farm, crop after getting disabled
    //     this.farm_name = '';
    //     this.crop_name = '';

    //     // hiding UL
    //     this.customerUL = false;
    //   } else {
    //     this.isDisabled = false;
         // showing UL
        this.customerUL = true;
    //   }
    // });
  }
  listClickedCustomer(customer) {
    console.log('Customer Object:',customer);

    // clearing array
    this.allCustomers = of([]);
    // this.allFarms = of([]);
    // this.allFarmsClicked = of([]);
    // this.allCrops = of([]);
    // this.allCropsClicked = of([]);

    // clearing value from farm & crop input
    // this.farm_name = '';
    // this.crop_name = '';

    // hiding UL
    this.customerUL = false;

    // removing farm & crop name from select
    this.changeFieldFormChief.setValue({
      customer_id:'', // <-
      field_id: '',
      acres: '',
      acres_completed: '',
    });

    // assigning values in form
    this.changeFieldFormChief.setValue({
      customer_id: customer.id, // <-
      field_id: this.changeFieldFormChief.get('field_id').value,
      acres: this.changeFieldFormChief.get('acres').value,
      acres_completed: this.changeFieldFormChief.get('acres_completed').value,
    });

    // this.jobSetupForm.setValue({
    //   state: this.jobSetupForm.get('state').value,
    //   customer_id: customer.id,
    //   farm_id: this.jobSetupForm.get('farm_id').value,
    //   crop_id: this.jobSetupForm.get('crop_id').value,
    //   initial_field: this.jobSetupForm.get('initial_field').value,
    // });

    // passing name in select's input
    this.customer_name = customer.customer_name;

    // passing name in customer-search-value in Rendered2 to checks
    this.customerSearchValue = customer.customer_name;

    // to enable submit button
    this.isCustomerSelected = false;

    // passing the customer id to  select farm & crop id
    this.customerID = customer.id;
  }
  // disableFields() {
  //   this.isDisabled = true;
  // }
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
