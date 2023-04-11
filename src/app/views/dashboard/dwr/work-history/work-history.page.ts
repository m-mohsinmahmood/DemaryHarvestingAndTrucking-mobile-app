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

  public loading = new BehaviorSubject(false);
  constructor(private router: Router,
    private dwrService: DWRService,
    private toastService: ToastService,
    ) {
  }

  ngOnInit() {
    console.log('IS-OPEN:',this.isOpen);

    this.employee_id = localStorage.getItem('employeeId');

    // call to render on-page
    // this.dwrs$ = this.dwrService.getDWR('f4cfa75b-7c14-4b68-a192-00d56c9f2022',this.date);
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
      .getDWR(
        '',
        this.date,
        localStorage.getItem('role'),
        'getMyDWR',
        'all'
      )
      .subscribe((res) => {
        console.log('RESPONSE:',res);
        this.dwrs$ = res;

        // to stop spinner
        this.loading.next(false);
      },(err)=>{
        this.loading.next(false);
        this.toastService.presentToast(err.mssage, 'danger');
      });
  }
  // getDWRByMonth() {
  //   // to statr spinner
  //   this.loading.next(true);

  //    this.dwrService.getMonthDWR(
  //     localStorage.getItem('employeeId'),
  //     this.monthValue,
  //     this.yearValue,
  //     localStorage.getItem('role'),
  //     'getMyDWR'
  //   ).subscribe((res)=>{
  //     let newArray: any = [];

  //        // combining in one array
  //        if (res.traineeData.length === 0) {
  //       } else {
  //         for (let index = 0; index < res.traineeData.length; index++) {
  //           newArray.push(res.traineeData[index]);
  //         }
  //       }

  //       if (res.trainerData.length === 0) {
  //       } else {
  //         for (let index = 0; index < res.trainerData.length; index++) {
  //           newArray.push(res.trainerData[index]);
  //         }
  //       }
  //       if (res.trainingData.length === 0) {
  //       } else {
  //         for (let index = 0; index < res.trainingData.length; index++) {
  //           newArray.push(res.trainingData[index]);
  //         }
  //       }
  //       if (res.farmingData.length === 0) {
  //       } else {
  //         for (let index = 0; index < res.farmingData.length; index++) {
  //           newArray.push(res.farmingData[index]);
  //         }
  //       }
  //       if (res.maintenanceRepairData.length === 0) {
  //       } else {
  //         for (let index = 0; index < res.maintenanceRepairData.length; index++) {
  //           newArray.push(res.maintenanceRepairData[index]);
  //         }
  //       }

  //       // to remove common dwr_id's
  //       const keys = ['dwr_id'];
  //       const filteredData = newArray.filter(
  //         (value, index, self) =>
  //           self.findIndex((v) => keys.every((k) => v[k] === value[k])) ===
  //           index
  //       );
  //       console.log(newArray);
  //       console.log(filteredData);

  //       this.monthDWRS$ = filteredData;

  //       // to stop spinner
  //       this.loading.next(false);
  //   });
  // }
}
