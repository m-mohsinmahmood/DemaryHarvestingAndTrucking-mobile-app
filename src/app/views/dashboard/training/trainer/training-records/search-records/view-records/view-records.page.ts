/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from '../../../../training.service';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.page.html',
  styleUrls: ['./view-records.page.scss'],
})
export class ViewRecordsPage implements OnInit {
  formType: any;
  preCheckForm: FormGroup;
  roadskillsForm: FormGroup;
  recordId: any;
  trainerName: any;
  records: any;
  trainee_id: any;
  moment: any = moment;
  math = Math;
  total;
  date: any;
  startDate: any;
  endDate: any;
  preTripTime;
  basicSkillTime;
  roadSkillTime;
  preTripAndRoadSkillTime;
  btw_range;
  // behaviour subject
  public loading = new BehaviorSubject(true);

  trainer_id;
  parseFloat: any;
  status: any;
  constructor(
    private router: Router,
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    // getting id & role
    this.getRoleAndID();

    //query params
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.formType = params.formType;
      this.recordId = params.recordId;
      this.trainerName = params.trainerName;
      this.trainee_id = params.trainee_id;
      // this.date = params.date;
      this.startDate = params.startDate;
      this.endDate = params.endDate;
    });

    this.initForms();

    if (this.formType === 'summary') {
      // getting record by id for summary
      this.trainingService
        // .getSummary(this.trainee_id, this.trainer_id, 'summary', this.date)
        .getSummary(this.trainee_id, this.trainer_id, 'summary',moment(this.startDate).startOf('day').toISOString(),moment(this.endDate).endOf('day').toISOString())
        .subscribe((record) => {
          this.loading.next(true);
          this.records = record.summary;
          this.btw_range = record.BTWRange;

          this.getSeperateTrainingTime(this.records);
          this.loading.next(false);
        });

    } else {
      // getting record by id for pre-trip, basic-skills,road-skills
      this.trainingService.getRecordById(this.recordId).subscribe((record) => {
        console.log(record);
        this.loading.next(true);
        this.records = record.summary[0];
        this.loading.next(false);

    this.loading.next(false);
      });

    }

  }
  async ionViewDidEnter() {
    this.getRoleAndID();
  }
  getRoleAndID() {
    this.trainer_id = localStorage.getItem('employeeId');
  }
  ngOnDestroy() {
    // this.loading.unsubscribe();
  }

  exit() {
    this.router.navigateByUrl('/tabs/home/training/trainer');
  }

  initForms() {

    this.roadskillsForm = this.fromBuilder.group({
      trainerName: ['', [Validators.required]],
      totalTime: ['', [Validators.required]],
    });
  }
  getSeperateTrainingTime(records){
    // if(records.evaluation_type === 'pre-trip'){
      // this.getPreTripTotalTrainingHoursTime(records);
    // }
    // if(records.evaluation_type === 'basic-skills'){
      // this.getBasicSkillTotalTrainingHoursTime(records);
    // }
    // if(records.evaluation_type === 'road-trip'){
      // this.getRoadTotalTrainingHoursTime(records);
    // }

    this.getPretripBasicTotalHoursTime(records);
    this.getRoadTotalTrainingHoursTime(records);
  }
  // getTotalTrainingHoursTime(records) {
  //   let totalSum: any = '00:00:00';
  //   records.map((record) => {
  //     if (
  //       record.evaluation_type === 'pre-trip' &&
  //       record.enddatepretrip !== null
  //     ) {
  //       totalSum = this.formatTime(
  //         this.timestrToSec(totalSum) +
  //           this.timestrToSec(moment(record.enddatepretrip).format('HH:mm:ss'))
  //       );
  //     }
  //     if (
  //       record.evaluation_type === 'basic-skills' &&
  //       record.enddatebasicskill !== null
  //     ) {
  //       totalSum = this.formatTime(
  //         this.timestrToSec(totalSum) +
  //           this.timestrToSec(
  //             moment(record.enddatebasicskill).format('HH:mm:ss')
  //           )
  //       );
  //     }
  //     if (
  //       record.evaluation_type === 'road-skills' &&
  //       record.enddateroadskill !== null
  //     ) {
  //       totalSum = this.formatTime(
  //         this.timestrToSec(totalSum) +
  //           this.timestrToSec(
  //             moment(record.enddateroadskill).format('HH:mm:ss')
  //           )
  //       );
  //     }
  //   });
  //   return totalSum;
  // }
  getPretripBasicTotalHoursTime(records){
    let totalSum: any = '00:00:00';
    records.map((record) => {
      if (
        record.evaluation_type === 'pre-trip' &&
        record.preTripTime !== null
      ) {
        totalSum = this.formatTime(
          this.timestrToSec(totalSum) +
            this.timestrToSec(moment(record.preTripTime).format('HH:mm:ss'))
        );
      }
      if (
        record.evaluation_type === 'basic-skills' &&
        record.basicSkillTime !== null
      ) {
        totalSum = this.formatTime(
          this.timestrToSec(totalSum) +
            this.timestrToSec(
              moment(record.basicSkillTime).format('HH:mm:ss')
            )
        );
      }
    });
    this.preTripAndRoadSkillTime =  totalSum;
  }
  // getPreTripTotalTrainingHoursTime(records){
  //   let totalSum: any = '00:00:00';
  //   records.map((record) => {
  //     if (
  //       record.evaluation_type === 'pre-trip' &&
  //       record.enddatepretrip !== null
  //     ) {
  //       totalSum = this.formatTime(
  //         this.timestrToSec(totalSum) +
  //           this.timestrToSec(
  //             moment(record.enddatepretrip).format('HH:mm:ss')
  //           )
  //       );
  //     }
  //   });
  //   this.preTripTime= totalSum;

  // }
  // getBasicSkillTotalTrainingHoursTime(records){
  //   let totalSum: any = '00:00:00';
  //   records.map((record) => {
  //     if (
  //       record.evaluation_type === 'basic-skills' &&
  //       record.enddatebasicskill !== null
  //     ) {
  //       totalSum = this.formatTime(
  //         this.timestrToSec(totalSum) +
  //           this.timestrToSec(
  //             moment(record.enddatebasicskill).format('HH:mm:ss')
  //           )
  //       );
  //     }
  //   });
  //   this.basicSkillTime= totalSum;

  // }
  getRoadTotalTrainingHoursTime(records){
    let totalSum: any = '00:00:00';
    records.map((record) => {
      if (
        record.evaluation_type === 'road-skills' &&
        record.roadSkillTime !== null
      ) {
        totalSum = this.formatTime(
          this.timestrToSec(totalSum) +
            this.timestrToSec(
              moment(record.roadSkillTime).format('HH:mm:ss')
            )
        );
      }
    });
    this.roadSkillTime= totalSum;

  }
  timestrToSec(timestr) {
    if (timestr !== 0) {
      const parts = timestr.split(':');
      return parts[0] * 3600 + parts[1] * 60 + +parts[2];
    }
  }
  pad(num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return '' + num;
    }
  }

getPreTripSubtract(records){
  var date1 = moment(records.created_at);
var date2 = moment(records.endDatePreTrip);
var diff = date2.diff(date1,'minutes');
var date = this.toHoursAndMinutes(diff);
return date;
}
getBasicSubtract(records){
  var date1 = moment(records.created_at);
var date2 = moment(records.endDateBasicSkill);
var diff = date2.diff(date1,'minutes');
var date = this.toHoursAndMinutes(diff);
return date;
}
getRoadSubtract(records){
  var date1 = moment(records.created_at);
var date2 = moment(records.endDateRoadSkill);
var diff = date2.diff(date1,'minutes');
var date = this.toHoursAndMinutes(diff);
return date;
}

toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalMinutes % 60;
  return `${this.padToTwoDigits(hours)}:${this.padToTwoDigits(minutes)}:${this.padToTwoDigits(seconds)}`;
}
padToTwoDigits(num) {
  return num.toString().padStart(2, '0');
}


  formatTime(seconds) {
    if (Number.isNaN(seconds)) {
    } else {
      return [
        this.pad(Math.floor(seconds / 3600)),
        this.pad(Math.floor(seconds / 60) % 60),
        this.pad(seconds % 60),
      ].join(':');
    }
  }
  getPreTripSum(records){
    return this.math.trunc(((+records?.percentageEngineCompartment + +records?.percentageInCab + +records?.percentageVehicleExternal + +records?.percentageCoupling)/400)*100) > 80;
  }
  getBasicSkillsSum(records){
   return +records.pullUpsInput_slb + + records.encroachInput_slb + +records.pullUpsInput_ad + +records.encroachInput_ad + +records.pullUpsInput_ad90 + +records.encroachInput_ad90 + +records.encroach_osb + +records.pullUps_osb + +records.pullUps_pb + +records.encroach_pb + +records.pullUps_ps + +records.encroach_ps + +records.pullUps_cou + +records.encroach_cou <= 24;
  }
}
