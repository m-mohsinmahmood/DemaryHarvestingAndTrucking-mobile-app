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
  // behaviour subject
  public loading = new BehaviorSubject(true);

  trainer_id;
  parseFloat: any;
  status: any
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
      this.formType = params.formType;
      this.recordId = params.recordId;
      this.trainerName = params.trainerName;
      this.trainee_id = params.trainee_id;
      this.date = params.date;
    });

    this.initForms();

    if (this.formType === 'summary') {
      // getting record by id for summary
      this.trainingService
        .getSummary(this.trainee_id, this.trainer_id, 'summary', this.date)
        .subscribe((record) => {
          this.loading.next(true);
          this.records = record;
          this.loading.next(false);
          console.log('RECORD:::',this.records);
        });

    } else {
      // getting record by id for pre-trip, basic-skills,road-skills
      this.trainingService.getRecordById(this.recordId).subscribe((record) => {
        this.loading.next(true);
        this.records = record[0];
        console.log('RECORD:', this.records);
    //     console.log('VALUE:',((+this.records.pullUpsInput_slb + +this.records.encroachInput_slb < 3) && (this.records.goal_slb === 'true') && (this.records.finalPosition_slb === 'true')) &&
    // ((+this.records.pullUpsInput_ad + +this.records.encroachInput_ad < 3) && (this.records.goal_ad === 'true') && (this.records.finalPosition_ad === 'true'))  &&
    // ((+this.records.encroach_osb + +this.records.pullUps_osb < 3) && (this.records.goal_osb === 'true') && (this.records.finalPosition_osb === 'true')) &&
    // ((+this.records.pullUps_pb + +this.records.encroach_pb < 3) && (this.records.goal_pb === 'true') && (this.records.finalPosition_pb === 'true')) &&
    // ((+this.records.pullUps_ps + +this.records.encroach_ps < 3) && (this.records.goal_ps === 'true') && (this.records.finalPosition_ps === 'true')) &&
    // ((+this.records.pullUps_cou + +this.records.encroach_cou < 3) && (this.records.goal_cou === 'true') && (this.records.finalPosition_cou === 'true')));


    this.status =((+this.records.pullUpsInput_slb + +this.records.encroachInput_slb < 3) && (this.records.goal_slb === 'true') && (this.records.finalPosition_slb === 'true')) &&
    ((+this.records.pullUpsInput_ad + +this.records.encroachInput_ad < 3) && (this.records.goal_ad === 'true') && (this.records.finalPosition_ad === 'true'))  &&
    ((+this.records.encroach_osb + +this.records.pullUps_osb < 3) && (this.records.goal_osb === 'true') && (this.records.finalPosition_osb === 'true')) &&
    ((+this.records.pullUps_pb + +this.records.encroach_pb < 3) && (this.records.goal_pb === 'true') && (this.records.finalPosition_pb === 'true')) &&
    ((+this.records.pullUps_ps + +this.records.encroach_ps < 3) && (this.records.goal_ps === 'true') && (this.records.finalPosition_ps === 'true')) &&
    ((+this.records.pullUps_cou + +this.records.encroach_cou < 3) && (this.records.goal_cou === 'true') && (this.records.finalPosition_cou === 'true'));

    // console.log('VALUE:',(!(+this.records.pullUpsInput_slb + +this.records.encroachInput_slb < 3) && (this.records.goal_slb === 'true') && (this.records.finalPosition_slb === 'true')) ||
    // (!(+this.records.pullUpsInput_ad + +this.records.encroachInput_ad < 3) && (this.records.goal_ad === 'true') && (this.records.finalPosition_ad === 'true'))  ||
    // (!(+this.records.encroach_osb + +this.records.pullUps_osb < 3) && (this.records.goal_osb === 'true') && (this.records.finalPosition_osb === 'true')) ||
    // (!(+this.records.pullUps_pb + +this.records.encroach_pb < 3) && (this.records.goal_pb === 'true') && (this.records.finalPosition_pb === 'true')) ||
    // (!(+this.records.pullUps_ps + +this.records.encroach_ps < 3) && (this.records.goal_ps === 'true') && (this.records.finalPosition_ps === 'true')) ||
    // (!(+this.records.pullUps_cou + +this.records.encroach_cou < 3) && (this.records.goal_cou === 'true') && (this.records.finalPosition_cou === 'true')));
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
    console.log(this.preCheckForm.value);
    console.log(this.roadskillsForm.value);
    this.router.navigateByUrl('/tabs/home/training/trainer');
  }

  initForms() {
    this.preCheckForm = this.fromBuilder.group({
      oilLevel: ['', [Validators.required]],
      coolantLevel: ['', [Validators.required]],
      steelingLevel: ['', [Validators.required]],
      h20: ['', [Validators.required]],
      alternatorBelt: ['', [Validators.required]],
      airCompresseorEngine: ['', [Validators.required]],
      leaksHoses: ['', [Validators.required]],
      fanShroud: ['', [Validators.required]],
      radiator: ['', [Validators.required]],
      wiring: ['', [Validators.required]],
      steeringBox: ['', [Validators.required]],
      steeringLinkage: ['', [Validators.required]],
      hosesSteering: ['', [Validators.required]],
      turbo: ['', [Validators.required]],
      windowFluid: ['', [Validators.required]],
      mirror: ['', [Validators.required]],
      clutchCondition: ['', [Validators.required]],
      commentsEngine: ['', [Validators.required]],
    });

    this.roadskillsForm = this.fromBuilder.group({
      trainerName: ['', [Validators.required]],
      totalTime: ['', [Validators.required]],
    });
  }
  getTotalTrainingHoursTime(records) {
    console.log(records);
    let totalSum: any = '00:00:00';
    records.map((record) => {
      if (
        record.evaluation_type === 'pre-trip' &&
        record.enddatepretrip !== null
      ) {
        totalSum = this.formatTime(
          this.timestrToSec(totalSum) +
            this.timestrToSec(moment(record.enddatepretrip).format('HH:mm:ss'))
        );
      }
      if (
        record.evaluation_type === 'basic-skills' &&
        record.enddatebasicskill !== null
      ) {
        totalSum = this.formatTime(
          this.timestrToSec(totalSum) +
            this.timestrToSec(
              moment(record.enddatebasicskill).format('HH:mm:ss')
            )
        );
      }
      if (
        record.evaluation_type === 'road-skills' &&
        record.enddateroadskill !== null
      ) {
        totalSum = this.formatTime(
          this.timestrToSec(totalSum) +
            this.timestrToSec(
              moment(record.enddateroadskill).format('HH:mm:ss')
            )
        );
      }
    });
    return totalSum;
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
    return this.math.trunc(((+records?.percentageEngineCompartment + +records?.percentageInCab + +records?.percentageVehicleExternal + +records?.percentageCoupling + +records?.percentageSuspension)/500)*100) > 40;
  }
  getBasicSkillsSum(records){
    return((+records.pullUpsInput_slb + +records.encroachInput_slb < 3) && (records.goal_slb === 'true') && (records.finalPosition_slb === 'true')) &&
    ((+records.pullUpsInput_ad + +records.encroachInput_ad < 3) && (records.goal_ad === 'true') && (records.finalPosition_ad === 'true'))  &&
    ((+records.pullUpsInput_ad90 + +records.encroachInput_ad90 < 3) && (records.goal_ad90 === 'true') && (records.finalPosition_ad90 === 'true'))  &&
    ((+records.encroach_osb + +records.pullUps_osb < 3) && (records.goal_osb === 'true') && (records.finalPosition_osb === 'true')) &&
    ((+records.pullUps_pb + +records.encroach_pb < 3) && (records.goal_pb === 'true') && (records.finalPosition_pb === 'true')) &&
    ((+records.pullUps_ps + +records.encroach_ps < 3) && (records.goal_ps === 'true') && (records.finalPosition_ps === 'true')) &&
    ((+records.pullUps_cou + +records.encroach_cou < 3) && (records.goal_cou === 'true') && (records.finalPosition_cou === 'true'));
  }
  getRoadSkillsSum(records){
   return ((records.leftTurnsInput < 3) && (records.leftTurns === 'true')) &&
          ((records.rightTurnsInput < 3) && (records.rightTurns === 'true'))  &&
          ((records.intersectionStopInput < 3) && (records.intersectionStop === 'true')) &&
          ((records.intersectionThruInput < 3) && (records.intersectionThru === 'true')) &&
          ((records.interstateInput < 3) && (records.interstate === 'true')) &&
          ((records.urbanBusinessInput < 3) && (records.urbanBusiness === 'true')) &&
          ((records.lanceChangesInput < 3) && (records.lanceChanges === 'true')) &&
          ((records.curveInput < 3) && (records.curve === 'true')) &&
          ((records.roadsideInput < 3) && (records.roadside === 'true')) &&
          ((records.rrCrossingInput < 3) && (records.rrCrossing === 'true')) &&
          ((records.signsInput < 3) && (records.signs === 'true')) &&
          ((records.eLogPracticalInput < 3) && (records.generalDriving === 'true')) &&
          ((records.generalDrivingInput < 3) && (records.eLogPractical === 'true'));
        }
}
