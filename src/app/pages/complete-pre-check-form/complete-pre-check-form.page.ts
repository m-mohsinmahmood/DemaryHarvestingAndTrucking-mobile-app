import { Component, OnInit, Renderer2 } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TripCheckService } from './trip-check-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complete-pre-check-form',
  templateUrl: './complete-pre-check-form.page.html',
  styleUrls: ['./complete-pre-check-form.page.scss'],
})
export class CompletePreCheckFormPage implements OnInit {
  data: Observable<any>;
  checkList;
  dataLoaded = false;
  orders;

  date: any = moment(new Date()).format('YYYY-MM-DD');
  monthValue: any = moment(new Date()).month() + 1;
  month: any = moment(new Date()).format('MM-YYYY');

  yearValue: any = moment(new Date()).year();
  year: any = moment(new Date()).year();

  dwrs$: Observable<any>;
  segment: any = 'day';
  activeTicket;

  constructor(
    private tripCheckFormService: TripCheckService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initDataFetch();
  }

  async ionViewDidEnter() {
    this.initDataFetch();
  }

  initDataFetch() {
    this.activeRoute.params.subscribe(param => {
      this.activeTicket = param;
      console.log(param);
    })
    this.data = this.tripCheckFormService.getActivePreCheckTicket('', localStorage.getItem('employeeId'));

    this.data.subscribe((workOrders) => {
      this.orders = workOrders;
      console.log(this.orders);
    });
  }

  getDate(e) {
    this.date = moment(e.detail.value).format('YYYY-MM-DD');
  }

  getMonth(e) {
    // passing month & year values
    this.monthValue = moment(e.detail.value).month() + 1;
    this.yearValue = moment(e.detail.value).year();

    // // passing month value for month select
    this.month = moment(e.detail.value).format('MM-YYYY');
  }

  getYear(e) {
    // passing month & year values
    this.yearValue = moment(e.detail.value).year();

    // // passing month value for month select
    this.year = moment(e.detail.value).format('YYYY');
    console.log(this.yearValue);
  }

  getTicketsOnSpecificInterval(time: string) {
    if (time === 'day') {
      this.tripCheckFormService.getPreCheckListDay(localStorage.getItem('employeeId'), moment(this.date).startOf('day').toISOString(),moment(this.date).endOf('day').toISOString(), 'day')
        .subscribe(param => {
          this.checkList = param;
          this.dataLoaded = true;
          console.log(param);
        })
    }
    else if (time === 'month') {
      this.tripCheckFormService.getPreCheckListMonth(localStorage.getItem('employeeId'), this.monthValue, this.yearValue, 'month')
        .subscribe(param => {
          this.checkList = param;
          this.dataLoaded = true;
          console.log(param);
        })
    }
    else if (time === 'year') {
      this.tripCheckFormService.getPreCheckListYear(localStorage.getItem('employeeId'), this.yearValue, 'year')
        .subscribe(param => {
          this.checkList = param;
          this.dataLoaded = true;
          console.log(param);
        })
    }
    else if (time === 'all') {
      this.tripCheckFormService.getPreCheckListAll(localStorage.getItem('employeeId'), 'all')
        .subscribe(param => {
          this.checkList = param;
          this.dataLoaded = true;
          console.log(param);
        })
    }
  }

}
