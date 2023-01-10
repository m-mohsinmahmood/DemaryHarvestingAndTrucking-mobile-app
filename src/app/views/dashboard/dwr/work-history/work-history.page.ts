import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DWRService } from '../dwr.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

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
  monthValue = moment(new Date()).month();
  yearValue = moment(new Date()).year();

  // Date & Month Observables
  dwrs$: Observable<any>;
  monthDWRS$: Observable<any>;

// to use in HTML
  moment: any = moment;

  isOpen;
  constructor(private router: Router, private dwrService: DWRService) {}

  ngOnInit() {
    // call to render on-page
    // this.dwrs$ = this.dwrService.getDWR('f4cfa75b-7c14-4b68-a192-00d56c9f2022',this.date);

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

  navigate(name: string,id: any) {
    this.router.navigateByUrl('/tabs/home/dwr/detail', {
      state: {
        type: name,
        id
      },
    });
  }
  getDWRByDate(){
    this.dwrs$ =this.dwrService.getDWR('f4cfa75b-7c14-4b68-a192-00d56c9f2022',this.date);
  }
  getDWRByMonth(){
    this.monthDWRS$ = this.dwrService.getMonthDWR('f4cfa75b-7c14-4b68-a192-00d56c9f2022',this.monthValue,this.yearValue);
  }
}
