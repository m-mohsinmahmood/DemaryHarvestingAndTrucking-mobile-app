/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DWRService } from '../dwr.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.page.html',
  styleUrls: ['./work-history.page.scss'],
})
export class WorkHistoryPage implements OnInit {
  segment: any = 'day';
  // select values
  date: any = moment(new Date()).format('YYYY-MM-DD');
  month: any = moment(new Date()).format('YYYY-MM');

  // payload values
  monthValue = moment(new Date()).month() + 1;
  yearValue = moment(new Date()).year();

  // Date & Month Observables
  dwrs$: Observable<any>;
  dwrs2: Observable<any>;
  monthDWRS$: Observable<any>;

  DWRSubValue: any;
  MonthSubValue: any;

// to use in HTML
  moment: any = moment;

  isOpen;

  // kart operator id
  kart_operator_id = 'f4cfa75b-7c14-4b68-a192-00d56c9f2022';

  // crew chief id
  crew_chief_id = '4b843edb-0b74-49a2-b3c7-d3884f5f6013';
  constructor(private router: Router, private dwrService: DWRService) {}

  ngOnInit() {
    // call to render on-page
    // this.dwrs$ = this.dwrService.getDWR('f4cfa75b-7c14-4b68-a192-00d56c9f2022',this.date);

  }
  ngOnDestroy(): void {
    this.DWRSubValue.unsubscribe();
  }
  getDate(e) {
    this.date = moment(e.detail.value).format('YYYY-MM-DD');
    this.isOpen = false;
  }
  getMonth(e) {
    // passing month & year values
    this.monthValue = moment(e.detail.value).month() +1;
    this.yearValue = moment(e.detail.value).year();

    // passing month value for month select
    this.month = moment(e.detail.value).format('YYYY-MM');

    // to close pop-over
    this.isOpen = false;
  }

  navigate(name: string,dwr_id: any) {
    this.router.navigate(['/tabs/home/dwr/detail'], {
      queryParams: {
        type: name,
        dwr_id
      },
    });
  }
  getDWRByDate(){
    this.DWRSubValue =this.dwrService.getDWR(localStorage.getItem('employeeId'),this.date,localStorage.getItem('role')).subscribe((res)=>{

  //   })
  // this.dwrs$.subscribe((res)=>{
    let newArray: any = [];
    console.log('res',res);
    if(res.traineeData.length === 0) {
    }else{
        newArray.push(res.traineeData[0]);
      }

    if(res.trainerData.length === 0) {
    }else{
      newArray.push(res.trainerData[0]);
    }
     if(res.trainingData.length === 0) {
    }else{
      newArray.push(res.trainingData[0]);
    }

// to remove common dwr_id's
const keys = ['dwr_id'];
const filteredData = newArray.filter((value, index, self) =>
  self.findIndex(v => keys.every(k => v[k] === value[k])) === index
);
console.log(newArray);
console.log(filteredData);

this.dwrs$ = filteredData;
this.dwrs2 = filteredData;
console.log('--',this.dwrs2);


  });
  }
  getDWRByMonth(){
    this.monthDWRS$ = this.dwrService.getMonthDWR(localStorage.getItem('employeeId'),this.monthValue,this.yearValue,localStorage.getItem('role'));
  }
}
