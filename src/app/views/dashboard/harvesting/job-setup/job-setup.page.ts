/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';
import { HarvestingService } from './../harvesting.service';
import { Observable, of, Subject, } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-job-setup',
  templateUrl: './job-setup.page.html',
  styleUrls: ['./job-setup.page.scss'],
})
export class JobSetupPage implements OnInit {
jobSetupForm: FormGroup;
states: string[];
allFarms: Observable<any>;
farm_search$ = new Subject();
search_location_text: string =  "";
selectedCity: any;
placeholderText = 'Select Customer';
add_location_overlay: boolean = true;
customerName: any;

cities = [
  {id: 1, name: 'Vilnius'},
  {id: 2, name: 'Kaunas'},
  {id: 3, name: 'Pavilnys'},
  {id: 4, name: 'Pabradė'},
  {id: 5, name: 'Klaipėda1'},
  {id: 6, name: 'Klaipėda2'},
  {id: 7, name: 'Klaipėda3'},
  {id: 8, name: 'Klaipėda4'},
  {id: 9, name: 'Klaipėda5'},
  {id: 10, name: 'Klaipėda6'},
  {id: 11, name: 'Klaipėda7'},
  {id: 12, name: 'Klaipėda8'},
  {id: 13, name: 'Klaipėda9'},
];

private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService

  ) { }

  ngOnInit() {

    this.jobSetupForm = this.formBuilder.group({
       state: ['',[Validators.required]],
       customerName:['',[Validators.required]],
       customerName2:['',[Validators.required]],
       customerName3:[''],
       farm: ['',[Validators.required]],
       crop:['',[Validators.required]],
       initailField: ['',[Validators.required]]
    });

    // pasing states
    this.states = states;

    // this.allFarms =  this.harvestingService.getDropdownCustomerCrops('0995eb02-1972-44ca-9c58-0e2623960731','');

    this.farmSearchSubscription();

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
}

  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.jobSetupForm.value);
  }
  onChange(e){
 console.log(e.target.value);
 this.allFarms =  this.harvestingService.getDropdownCustomerFarms('0995eb02-1972-44ca-9c58-0e2623960731','');

//  this.farm_search$
//             .pipe(
//                 debounceTime(500),
//                 distinctUntilChanged(),
//                 takeUntil(this._unsubscribeAll)
//             )
//             .subscribe((value: string) => {
//                 this.allFarms = this.harvestingService.getDropdownCustomerCrops(
//                     '0995eb02-1972-44ca-9c58-0e2623960731',
//                     e.target.value
//                 );
//             });
            console.log('All Farms',this.farm_search$);
  }

//   keyUp(e){
//     console.log(e.target.value);
//   }

inputChange(e){
    console.log(e.target.value);
     this.allFarms = this.harvestingService.getDropdownCustomerFarms('0995eb02-1972-44ca-9c58-0e2623960731','');
     console.log("this.allFarms",this.allFarms);
    // .subscribe((j)=>{
    //     console.log('ALL FARMS:',j);
    //     this.allFarms = j;
    // });
    // console.log('Farms:',this.farms);
    // this.farm_search$
    //         .pipe(
    //             debounceTime(500),
    //             distinctUntilChanged(),
    //             takeUntil(this._unsubscribeAll)
    //         )
    //         .subscribe((value: string) => {
    //             this.allFarms = this.harvestingService.getDropdownCustomerFarms(
    //                 '0995eb02-1972-44ca-9c58-0e2623960731',
    //                 'Ammad'
    //             );
    //         });
            // console.log('All Farms',this.farm_search$);
  }

getDropdownFarms() {
    // typeof this.form.controls['farm_id'].value === 'object' ? (value = this.form.controls['farm_id'].value.name) : value = this.form.controls['farm_id'].value;
     this.allFarms =  this.harvestingService.getDropdownCustomerFarms('0995eb02-1972-44ca-9c58-0e2623960731','');
    // .subscribe((farms)=>{
    //     console.log('ALL FARMS:',farms);
    //     this.allFarms = farms;
    // });
    console.log('===',this.allFarms);
    // this.allFarms.subscribe((m)=>{
    //    console.log(m);
    // });
}
itemClicked(farm){
  this.allFarms = of([]);
  console.log('selected Farm:',farm);
  // this.allFarms =  this.harvestingService.getDropdownCustomerFarms('0995eb02-1972-44ca-9c58-0e2623960731','');
}

  farmSearchSubscription() {
    console.log('---');
        this.farm_search$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value: string) => {
                this.allFarms = this.harvestingService.getDropdownCustomerFarms(
                    '0995eb02-1972-44ca-9c58-0e2623960731',
                    value
                );
            });
    }

  inputClicked(){
    console.log('first');
    this.allFarms =  this.harvestingService.getDropdownCustomerFarms('0995eb02-1972-44ca-9c58-0e2623960731','');
    // this.allFarms = of([]);

    // clearing placeholder text
    this.placeholderText = '';

    console.log('---',this.jobSetupForm.value);
  }
  listClicked(farm){
  this.allFarms = of([]);
  this.jobSetupForm.setValue({
    state: this.jobSetupForm.get('state').value,
    customerName: this.jobSetupForm.get('customerName').value,
    customerName2: this.jobSetupForm.get('customerName2').value,
    customerName3:farm.name,
    farm: this.jobSetupForm.get('farm').value,
    crop:this.jobSetupForm.get('crop').value,
    initailField: this.jobSetupForm.get('initailField').value
  });
  this.customerName = farm.name;
  console.log(this.jobSetupForm.value);
  console.log(farm);

  }
  search(search){
    console.log('-',search);
    this.allFarms =  this.harvestingService.getDropdownCustomerFarms('0995eb02-1972-44ca-9c58-0e2623960731',search.term);

  }

}
