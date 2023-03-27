/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../training.service';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.page.html',
  styleUrls: ['./evaluation-form.page.scss'],
})
export class EvaluationFormPage implements OnInit {
  evaluationFrom: FormGroup;
totalSatisfactory = 0;
totalUnSatisfactory = 0;

 trainer_id;
 supervisor_id;
 training_record_id;
 active_check_in_id: any;

 public loadingSpinner = new BehaviorSubject(false);
 public activeCheckInSpinner = new BehaviorSubject(false);

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private dwrServices: CheckInOutService

    ) { }

  ngOnInit() {
      // getting id & role
   this.getRoleAndID();

   this.initForm();

   // query params
   this.route.queryParams.subscribe((params)=>{
    this.training_record_id = params.training_record_id;
    this.supervisor_id = params.supervisor_id;

  });
  }

  async ionViewDidEnter() {
    this.getRoleAndID();
  }
  getRoleAndID(){
    this.trainer_id = localStorage.getItem('employeeId');

  }
  initForm(){
    this.evaluationFrom = this.formBuilder.group({
      leftTurns: ['',[Validators.required]],
      leftTurnsInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      rightTurns: ['',[Validators.required]],
      rightTurnsInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      intersectionStop: ['',[Validators.required]],
      intersectionStopInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      intersectionThru: ['',[Validators.required]],
      intersectionThruInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      interstate: ['',[Validators.required]],
      interstateInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      urbanBusiness: ['',[Validators.required]],
      urbanBusinessInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      lanceChanges: ['',[Validators.required]],
      lanceChangesInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      curve: ['',[Validators.required]],
      curveInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      roadside: ['',[Validators.required]],
      roadsideInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      rrCrossing: ['',[Validators.required]],
      rrCrossingInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      signs: ['',[Validators.required]],
      signsInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      generalDriving: ['',[Validators.required]],
      generalDrivingInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      eLogPractical: ['',[Validators.required]],
      eLogPracticalInput: ['',[Validators.required,Validators.pattern('^([0-5])$')]],
      category:['road-testing'],
      satisfactoryRoadTesting:[],
      unSatisfactoryRoadTesting:[],
      trainer_id: [this.trainer_id],


    });
    // this.evaluationFrom.valueChanges.subscribe((value) => {
      // let sum = 0;
      // let unSatSum = 0;

      //     if(value.leftTurns === 'true'){
      //       sum = +value.leftTurnsInput + sum;
      //     }else{
      //       unSatSum = +value.leftTurnsInput + unSatSum;
      //     }
      //     if(value.rightTurns === 'true'){
      //       sum = +value.rightTurnsInput + sum;
      //     }else{
      //       unSatSum = +value.rightTurnsInput + unSatSum;
      //     }
      //     if(value.intersectionStop === 'true'){
      //       sum = +value.intersectionStopInput + sum;
      //     }else{
      //       unSatSum = +value.intersectionStopInput + unSatSum;
      //     }
      //     if(value.intersectionThru === 'true'){
      //       sum = +value.intersectionThruInput + sum;
      //     }else{
      //       unSatSum = +value.intersectionThruInput + unSatSum;
      //     }
      //     if(value.interstate === 'true'){
      //       sum = +value.interstateInput + sum;
      //     }else{
      //       unSatSum = +value.interstateInput + unSatSum;
      //     }
      //     if(value.urbanBusiness === 'true'){
      //       sum = +value.urbanBusinessInput + sum;
      //     }else{
      //       unSatSum = +value.urbanBusinessInput + unSatSum;
      //     }
      //     if(value.lanceChanges === 'true'){
      //       sum = +value.lanceChangesInput + sum;
      //     }else{
      //       unSatSum = +value.lanceChangesInput + unSatSum;
      //     }
      //     if(value.curve === 'true'){
      //       sum = +value.curveInput + sum;
      //     }else{
      //       unSatSum = +value.curveInput + unSatSum;
      //     }
      //     if(value.roadside === 'true'){
      //       sum = +value.roadsideInput + sum;
      //     }else{
      //       unSatSum = +value.roadsideInput + unSatSum;
      //     }
      //     if(value.rrCrossing === 'true'){
      //       sum = +value.rrCrossingInput + sum;
      //     }else{
      //       unSatSum = +value.rrCrossingInput + unSatSum;
      //     }
      //     if(value.signs === 'true'){
      //       sum = +value.signsInput + sum;
      //     }else{
      //       unSatSum = +value.signsInput + unSatSum;
      //     }
      //     if(value.generalDriving === 'true'){
      //       sum = +value.generalDrivingInput + sum;
      //     }else{
      //       unSatSum = +value.generalDrivingInput + unSatSum;
      //     }
      //     if(value.eLogPractical === 'true'){
      //       sum = +value.eLogPracticalInput + sum;
      //     }else{
      //       unSatSum = +value.eLogPracticalInput + unSatSum;
      //     }
      //     this.totalSatisfactory = sum;
      //     this.totalUnSatisfactory = unSatSum;

    // });
  }
endEvaluation(){
  console.log(this.evaluationFrom.value);
  this.loadingSpinner.next(true);

  // patching sat & un-sat results
  this.evaluationFrom.patchValue({
    satisfactoryRoadTesting:this.totalSatisfactory,
    unSatisfactoryRoadTesting:this.totalUnSatisfactory
  });
  console.log(this.evaluationFrom.value);
  this.trainingService.saveFroms(this.evaluationFrom.value, 'road-skills').subscribe(
    (res) => {
      console.log('RES:', res);
      if (res.status === 200) {
        // spinner
        this.loadingSpinner.next(false);

      // getting check-in id
      this.getCheckInID();

    //   // creating DWR
    //  this.createDWR();

        // // tooltip
        // this.toastService.presentToast(
        //   'Evaluation ended',
        //   'success'
        // );

        // // navigating
        // this.router.navigateByUrl('/tabs/home/training/trainer');

      } else {
        console.log('Something happened :)');
        this.toastService.presentToast(res.mssage, 'danger');
      }
    },
    (err) => {
      console.log('ERROR::', err);
      this.toastService.presentToast(err.mssage, 'danger');
    }
  );
}
getCheckInID(){

  this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
    this.activeCheckInSpinner.next(true);
    console.log('Active Check ID: ', workOrder.dwr[0].id);
    this.active_check_in_id = workOrder.dwr[0].id;
    this.activeCheckInSpinner.next(false);

      // creating DWR
      this.createDWR();
  });

}

createDWR(){
  this.trainingService
   .createDWR(this.trainer_id, this.training_record_id,'','','road-skills','digital-form',this.supervisor_id,this.active_check_in_id)
   .subscribe(
     (res) => {
       if (res.status === 200) {
        // tooltip
        this.toastService.presentToast(
          'Evaluation ended',
          'success'
        );

        // navigating
        this.router.navigateByUrl('/tabs/home/training/trainer');

       } else {
         console.log('Something happened :)');
         this.toastService.presentToast(res.mssage, 'danger');
       }
     },
     (err) => {
       console.log('ERROR::', err);
       this.toastService.presentToast(err.mssage, 'danger');
     }
   );
}
};

