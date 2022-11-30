import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';
import { HarvestingService } from './../harvesting.service';
import { Observable, Subject, } from 'rxjs';
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
       farm: ['',[Validators.required]],
       crop:['',[Validators.required]],
       initailField: ['',[Validators.required]]
    });

    // pasing states
    this.states = states;

    this.allFarms =  this.harvestingService.getDropdownCustomerCrops('0995eb02-1972-44ca-9c58-0e2623960731','');

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
    this.allFarms =  this.harvestingService.getDropdownCustomerCrops('0995eb02-1972-44ca-9c58-0e2623960731','');
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
            console.log('All Farms',this.farm_search$);
  }

}
