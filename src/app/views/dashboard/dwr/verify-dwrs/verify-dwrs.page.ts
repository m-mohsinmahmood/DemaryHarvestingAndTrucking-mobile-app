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

@Component({
  selector: 'app-verify-dwrs',
  templateUrl: './verify-dwrs.page.html',
  styleUrls: ['./verify-dwrs.page.scss'],
})
export class VerifyDwrsPage implements OnInit {
  segment: any = 'day';
  // select values
  date: any = moment(new Date()).format('DD-MM-YYYY');
  month: any = moment(new Date()).format('MM-YYYY');

  // payload values
  monthValue = moment(new Date()).month() + 1;
  yearValue = moment(new Date()).year();

  // Date & Month Observables
  dwrs$: any;
  monthDWRS$: any;

// to use in HTML
  moment: any = moment;
  role='';
  supervisor_id: any;

  DWRSubValue: any;
  MonthSubValue: any;
    // // crew chief id
    // crew_chief_id = '4b843edb-0b74-49a2-b3c7-d3884f5f6013';
    public loading = new BehaviorSubject(false);

  constructor(
    private location: Location,
    private router: Router,
    private dwrService: DWRService

  ) { }

  ngOnInit() {
    //getting role
    this.role = localStorage.getItem('role');
    this.supervisor_id = localStorage.getItem('employeeId');
  }
  goBack(){
    this.location.back();
  }
  getDate(e) {
    this.date = moment(e.detail.value).format('MM-DD-YYYY');
    }
  getMonth(e) {
    // passing month & year values
    this.monthValue = moment(e.detail.value).month() +1;
    this.yearValue = moment(e.detail.value).year();

    // passing month value for month select
    this.month = moment(e.detail.value).format('MM-YYYY');

  }
  getDWRByDate(){
     // to start spinner
     this.loading.next(true);

    this.DWRSubValue = this.dwrService.getDWR(this.supervisor_id,this.date,'supervisor').subscribe((res)=>{
      const newArray: any = [];

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
          for (let index = 0; index < res.farmingData.length; index++) {
            newArray.push(res.farmingData[index]);
          }
        }
        if (res.maintenanceRepairData.length === 0) {
        } else {
          for (let index = 0; index < res.maintenanceRepairData.length; index++) {
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

         this.dwrs$ = filteredData;

         // to stop spinner
         this.loading.next(false);

    });
  }
  getDWRByMonth(){
    // to start spinner
    this.loading.next(true);

    this.MonthSubValue = this.dwrService.getMonthDWR(this.supervisor_id,this.monthValue,this.yearValue,'supervisor').subscribe((res)=>{
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
        for (let index = 0; index < res.maintenanceRepairData.length; index++) {
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
  navigate(name: string,dwr_id: any,dwr_type: any) {
    this.router.navigate(['/tabs/home/dwr/detail'], {
      queryParams: {
        type: name,
        dwr_id,
        dwr_type
      },
    });
  }
}
