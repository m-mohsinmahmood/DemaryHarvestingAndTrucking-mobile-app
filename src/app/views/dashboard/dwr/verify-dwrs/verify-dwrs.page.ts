/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DWRService } from '../dwr.service';
import { map } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';

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
  monthValue = moment(new Date()).month() + 1;
  yearValue = moment(new Date()).year();

  // Date & Month Observables
  dwrs$: any;
  monthDWRS$: any;

  // to use in HTML
  moment: any = moment;
  role = '';
  supervisor_id: any;
  isOpen = false;

  DWRSubValue: any;
  MonthSubValue: any;

  dwr_id: any;
  dwr_employee_Id: any;

  hasEmpId;

  public loading = new BehaviorSubject(false);
  public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private location: Location,
    private router: Router,
    private dwrService: DWRService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    //getting role
    this.role = localStorage.getItem('role');
    this.supervisor_id = localStorage.getItem('employeeId');
  }
  async ionViewDidEnter() {
    this.getDWRByDate();
  }
  getFormattedHours(hours){
    return hours.toFixed(2);
  }
  goBack() {
    this.location.back();
  }
  getDate(e) {
    this.date = moment(e.detail.value).format('MM-DD-YYYY');
  }
  getMonth(e) {
    // passing month & year values
    this.monthValue = moment(e.detail.value).month() + 1;
    this.yearValue = moment(e.detail.value).year();

    // passing month value for month select
    this.month = moment(e.detail.value).format('MM-YYYY');
  }
  getDWRByDate() {
    // to start spinner
    this.loading.next(true);
    this.DWRSubValue = this.dwrService
      .getDWRNew('', moment(this.date).startOf('day').toISOString(), moment(this.date).endOf('day').toISOString(), '', '','pendingVerification')
      .subscribe((res) => {
        this.dwrs$ = res;

        // to stop spinner
        this.loading.next(false);
        //if current employee/supervisor is included in array
        //  res.dwrSummary.some((obj) =>{
          // console.log(obj);
          // console.log(obj.last_supervisor_id);
          // Object.values(obj).includes(localStorage.getItem('employeeId'));
        //  });
        // this.hasEmpId = res.dwrSummary.some(obj =>Object.values(obj.last_supervisor_id).includes(localStorage.getItem('employeeId')));

        //  console.log('Has employee:',this.hasEmpId);
      });
  }
  getDWRByMonth(){

  }
  navigate(dwr_type: string, dwr_id: any, employee_id) {
    this.router.navigate(['/tabs/home/dwr/detail'], {
      queryParams: {
        dwr_id,
        employee_id,
        date: this.date,
        dwr_type,
      },
    });
  }
  verify(employee_id,dwr_id) {
    this.dwr_id = dwr_id;
    console.log(employee_id);
    this.dwr_employee_Id = employee_id;
    // start loader
    this.loadingSpinner.next(true);
    // this.supervisor_id = null;

    this.dwrService
      .verify(
        'verifyDwr',
        employee_id,
        'day',
        moment(this.date).startOf('day').toISOString(),
        '',
        '',
        moment(this.date).endOf('day').toISOString()
      )
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            // calling again date DWR
            this.getDWRByDate();

            this.toastService.presentToast(
              'Ticket verified',
              'success'
            );
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
            this.loadingSpinner.next(false);
          }
        },
        (err) => {
          this.toastService.presentToast(err.mssage, 'danger');
          this.loadingSpinner.next(false);
        }
      );
  }
}
