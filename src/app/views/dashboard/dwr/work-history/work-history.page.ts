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
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.page.html',
  styleUrls: ['./work-history.page.scss'],
})
export class WorkHistoryPage implements OnInit {
  segment: any = 'day';
  // select values
  date: any = moment(new Date()).format('MM-DD-YYYY');
  month: any = moment(new Date()).format('YYYY-MM');

  // payload values
  monthValue = moment(new Date()).month() + 1;
  yearValue = moment(new Date()).year();

  // Date & Month Observables
  dwrs$: any;
  monthDWRS$: any;

  DWRSubValue: any;
  MonthSubValue: any;

  // to use in HTML
  moment: any = moment;

  isOpen = 'false';
  employee_id;
  hasEmpId;
  selected: {
    startDate: any,
    endDate: any
  };

  dateRange = {
    from: moment().startOf('day').format('YYYY/MM/DD HH:mm:ss'),
    to: moment().endOf('day').format('YYYY/MM/DD HH:mm:ss')
  };

  public loading = new BehaviorSubject(false);
  constructor(private router: Router,
    private dwrService: DWRService,
    private toastService: ToastService,
  ) {
    this.selected = {
      startDate: dayjs().subtract(1, 'weeks').startOf('week'),
      endDate: dayjs().subtract(1, 'weeks').endOf('week')
    };
  }

  ngOnInit() {
    this.employee_id = localStorage.getItem('employeeId');
    // this.selected.startDate = dayjs();
    // this.selected.endDate = dayjs();
  }

  async ionViewDidEnter() {
    this.segment = 'day';
    this.getDWRByDate();
  }

  ngOnDestroy(): void {
    // this.DWRSubValue.unsubscribe();
  }

  changeSegmentValue(event) {
    console.log(event);
    this.dwrs$ = '';

    if (event.detail.value == 'day') {
      this.getDWRByDate();
    } else {
      this.getDWRByMonth();
    }
  }

  getFormattedHours(hours) {
    return hours.toFixed(2);
  }

  call() {
    this.isOpen = 'true';
  }

  getDate(e) {
    this.date = moment(e.detail.value).format('MM-DD-YYYY');
    this.isOpen = 'false';
  }

  getMonth(e) {
    // passing month & year values
    this.monthValue = moment(e.detail.value).month() + 1;
    this.yearValue = moment(e.detail.value).year();

    // passing month value for month select
    this.month = moment(e.detail.value).format('YYYY-MM');

    // to close pop-over
    this.isOpen = 'false';
  }

  navigate(dwr_type, dwr_employee_id) {
    if (this.segment == 'day') {
      this.router.navigate(['/tabs/home/dwr/detail'], {
        queryParams: {
          dwr_type,
          date: this.date,
          employee_id: dwr_employee_id,
          dateType: 'day'
        },
      });
    } else {
      let dateRangeToPass = {
        startDate: this.dateRange.from,
        endDate: this.dateRange.to
      }

      this.router.navigate(['/tabs/home/dwr/detail'], {
        queryParams: {
          dwr_type,
          date: JSON.stringify(dateRangeToPass),
          employee_id: dwr_employee_id,
          dateType: 'month'
        },
      });
    }
  }

  // datepicker
  choosedDate(event) {
    if (event.startDate) {
      this.dateRange.from = event.startDate.format('YYYY-MM-DD')
      this.dateRange.to = event.endDate.format('YYYY-MM-DD')
    }
  }

  getDWRByDate() {
    // to statr spinner
    this.loading.next(true);
    var stDay = moment(this.date).startOf('day').format('YYYY/MM/DD HH:mm:ss');
    var enDay = moment(this.date).endOf('day').format('YYYY/MM/DD HH:mm:ss');

    this.dwrService
      .getDWRNew(
        localStorage.getItem('employeeId'),
        new Date(stDay).toISOString(),
        new Date(enDay).toISOString(),
        localStorage.getItem('role'),
        'getMyDWR',
        'all',
        'day'
      )
      .subscribe((res) => {
        this.dwrs$ = res;

        res.dwrSummary.some(obj => {
          console.log('ressss', obj.employee_Id === localStorage.getItem('employeeId'));
          Object.values(obj).includes(localStorage.getItem('employeeId'));
        });

        // if current employee/supervisor is included in array
        this.hasEmpId = res.dwrSummary.some(obj => Object.values(obj).includes(localStorage.getItem('employeeId')));

        // to stop spinner
        this.loading.next(false);
      }, (err) => {
        this.loading.next(false);
        this.toastService.presentToast(err.mssage, 'danger');
      });
  }

  getDWRByMonth() {
    this.loading.next(true);
    var stDay = moment(this.dateRange.from).startOf('day').format('YYYY/MM/DD HH:mm:ss');
    var enDay = moment(this.dateRange.to).endOf('day').format('YYYY/MM/DD HH:mm:ss');

    this.dwrService
      .getDWRNew(
        localStorage.getItem('employeeId'),
        new Date(stDay).toISOString(),
        new Date(enDay).toISOString(),
        localStorage.getItem('role'),
        'getMyDWR',
        'all',
        'month'
      )
      .subscribe((res) => {
        this.dwrs$ = res;

        res.dwrSummary.some(obj => {
          console.log('ressss', obj.employee_Id === localStorage.getItem('employeeId'));
          Object.values(obj).includes(localStorage.getItem('employeeId'));
        });

        // if current employee/supervisor is included in array
        this.hasEmpId = res.dwrSummary.some(obj => Object.values(obj).includes(localStorage.getItem('employeeId')));

        // to stop spinner
        this.loading.next(false);
      }, (err) => {
        this.loading.next(false);
        this.toastService.presentToast(err.mssage, 'danger');
      });
  }
}
