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
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';

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
  dwrs$: any;
  monthDWRS$: any;

  DWRSubValue: any;
  MonthSubValue: any;

  // to use in HTML
  moment: any = moment;

  isOpen = 'false';
  employee_id;
  hasEmpId;

  public loading = new BehaviorSubject(false);
  constructor(private router: Router,
    private dwrService: DWRService,
    private toastService: ToastService,
    ) {
  }

  ngOnInit() {
    console.log('IS-OPEN:',this.isOpen);

    this.employee_id = localStorage.getItem('employeeId');

  }
  async ionViewDidEnter() {
    this.getDWRByDate();
  }

  ngOnDestroy(): void {
    // this.DWRSubValue.unsubscribe();
  }
  getFormattedHours(hours){
    return hours.toFixed(2);
  }
  call(){
    console.log('CALLED');
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

  navigate(dwr_type,dwr_employee_id) {
    this.router.navigate(['/tabs/home/dwr/detail'], {
      queryParams: {
        dwr_type,
        date: this.date,
        employee_id:dwr_employee_id
      },
    });
  }
  getDWRByDate() {
    // to statr spinner
    this.loading.next(true);

    this.dwrService
      .getDWRNew(
        localStorage.getItem('employeeId'),
        moment(this.date).startOf('day').toISOString(),
        moment(this.date).endOf('day').toISOString(),
        localStorage.getItem('role'),
        'getMyDWR',
        'all'
      )
      .subscribe((res) => {
        console.log('RESPONSE:',res);
        this.dwrs$ = res;

         res.dwrSummary.some(obj => {
          console.log('ressss',obj.employee_Id === localStorage.getItem('employeeId'));
          Object.values(obj).includes(localStorage.getItem('employeeId'));
         });

        // if current employee/supervisor is included in array
         this.hasEmpId = res.dwrSummary.some(obj => Object.values(obj).includes(localStorage.getItem('employeeId')));

         // to stop spinner
        this.loading.next(false);
      },(err)=>{
        this.loading.next(false);
        this.toastService.presentToast(err.mssage, 'danger');
      });
  }
  getDWRByMonth(){
    // this.dwrService
    //   .getMonthDWR(
    //     localStorage.getItem('employeeId'),
    //     this.monthValue,
    //     this.yearValue
    //   )
    //   .subscribe((res) => {
    //     console.log('RESPONSE:',res);
    //     this.monthDWRS$ = res;

    //      // to stop spinner
    //     this.loading.next(false);
    //   },(err)=>{
    //     this.loading.next(false);
    //     this.toastService.presentToast(err.mssage, 'danger');
    //   });
  }
}
