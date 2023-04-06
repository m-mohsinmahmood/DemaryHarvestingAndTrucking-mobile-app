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
      .getDWR('', this.date, '', '')
      .subscribe((res) => {
        this.dwrs$ = res;

        // to stop spinner
        this.loading.next(false);
      });
  }
  getDWRByMonth() {
    // to start spinner
    this.loading.next(true);

    this.MonthSubValue = this.dwrService
      .getMonthDWR(
        this.supervisor_id,
        this.monthValue,
        this.yearValue,
        this.role,
        'getAssignedDWR'
      )
      .subscribe((res) => {
        let newArray: any = [];

        // combining in one array
        if (res.traineeData.length === 0) {
        } else {
          for (let index = 0; index < res.traineeData.length; index++) {
            newArray.push(res.traineeData[index]);
          }
        }

        if (res.trainerData.length === 0) {
        } else {
          for (let index = 0; index < res.trainerData.length; index++) {
            newArray.push(res.trainerData[index]);
          }
        }
        if (res.trainingData.length === 0) {
        } else {
          for (let index = 0; index < res.trainingData.length; index++) {
            newArray.push(res.trainingData[index]);
          }
        }
        if (res.farmingData.length === 0) {
        } else {
          newArray.push(res.farmingData[0]);
          for (let index = 0; index < res.farmingData.length; index++) {
            newArray.push(res.farmingData[index]);
          }
        }
        if (res.maintenanceRepairData.length === 0) {
        } else {
          for (
            let index = 0;
            index < res.maintenanceRepairData.length;
            index++
          ) {
            newArray.push(res.maintenanceRepairData[index]);
          }
        }

        // to remove common dwr_id's
        const keys = ['dwr_id'];
        const filteredData = newArray.filter(
          (value, index, self) =>
            self.findIndex((v) => keys.every((k) => v[k] === value[k])) ===
            index
        );
        console.log(newArray);
        console.log(filteredData);

        this.monthDWRS$ = filteredData;

        // to stop spinner
        this.loading.next(false);
      });
  }
  navigate(dwr_type: string, dwr_id: any, employee_id) {
    // console.log('--',employee_id);
    // dwrData.map((dwrData)=>{
    //   if(dwrData.employee_id === employee_id){
    //     console.log('dwrData',dwrData.data);
    //     this.router.navigate(['/tabs/home/dwr/detail'], {
    //       queryParams: {
    //         type: name,
    //         dwr_id,
    //         dwr_type,
    //         dwrData: JSON.stringify(dwrData),
    //         employee_id,
    //         date: this.date
    //       },
    //     });
    //   }
    // });

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
    // start loader
    this.loadingSpinner.next(true);

    this.dwrService
      .verify(
        'verifyDwr',
        employee_id,
        'day',
        this.date,
        '',
        ''
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
            // this.router.navigateByUrl('/tabs/home/maintenance-repair');
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
