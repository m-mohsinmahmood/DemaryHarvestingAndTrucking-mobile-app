/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DWRService } from '../dwr.service';

@Component({
  selector: 'app-verify-dwrs',
  templateUrl: './verify-dwrs.page.html',
  styleUrls: ['./verify-dwrs.page.scss'],
})
export class VerifyDwrsPage implements OnInit {
  segment: any = 'day';
  // select values
  date: any = moment(new Date()).format('YYYY-MM-DD');
  month: any = moment(new Date()).format('YYYY-MM');

  // payload values
  monthValue = moment(new Date()).month();
  yearValue = moment(new Date()).year();

  // Date & Month Observables
  dwrs$: Observable<any>;
  monthDWRS$: Observable<any>;

// to use in HTML
  moment: any = moment;

    // // crew chief id
    // crew_chief_id = '4b843edb-0b74-49a2-b3c7-d3884f5f6013';

  constructor(
    private location: Location,
    private router: Router,
    private dwrService: DWRService

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
  getDate(e) {
    this.date = moment(e.detail.value).format('YYYY-MM-DD');
    }
  getMonth(e) {
    // passing month & year values
    this.monthValue = moment(e.detail.value).month() +1;
    this.yearValue = moment(e.detail.value).year();

    // passing month value for month select
    this.month = moment(e.detail.value).format('YYYY-MM');

  }
  getDWRByDate(){
    this.dwrs$ =this.dwrService.getDWR(localStorage.getItem('employeeId'),this.date,localStorage.getItem('role'));
  }
  getDWRByMonth(){
    this.monthDWRS$ = this.dwrService.getMonthDWR(localStorage.getItem('employeeId'),this.monthValue,this.yearValue,localStorage.getItem('role'));
  }
  // navigate(name: string,id: any) {
  //   this.router.navigateByUrl('/tabs/home/dwr/verify-dwrs/verify-dwr', {
  //     state: {
  //       type: name,
  //       id
  //     },
  //   });
  // }
  navigate(name: string){
    this.router.navigateByUrl('/tabs/home/dwr/detail',{
      state:{
        type: name
      }
    });
  }
}
