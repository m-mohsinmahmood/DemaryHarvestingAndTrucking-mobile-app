/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../training.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.page.html',
  styleUrls: ['./evaluation-form.page.scss'],
})
export class EvaluationFormPage implements OnInit {
  evaluationFrom: FormGroup;
totalSatisfactory = 0;
totalUnSatisfactory = 0;

 // trainer id
 trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';
 public loadingSpinner = new BehaviorSubject(false);

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService
    ) { }

  ngOnInit() {
    this.evaluationFrom = this.formBuilder.group({
      leftTurns: ['',[Validators.required]],
      leftTurnsInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      rightTurns: ['',[Validators.required]],
      rightTurnsInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      intersectionStop: ['',[Validators.required]],
      intersectionStopInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      intersectionThru: ['',[Validators.required]],
      intersectionThruInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      interstate: ['',[Validators.required]],
      interstateInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      urbanBusiness: ['',[Validators.required]],
      urbanBusinessInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      lanceChanges: ['',[Validators.required]],
      lanceChangesInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      curve: ['',[Validators.required]],
      curveInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      roadside: ['',[Validators.required]],
      roadsideInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      rrCrossing: ['',[Validators.required]],
      rrCrossingInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      signs: ['',[Validators.required]],
      signsInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      generalDriving: ['',[Validators.required]],
      generalDrivingInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      eLogPractical: ['',[Validators.required]],
      eLogPracticalInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      category:['road-testing'],
      satisfactoryRoadTesting:[],
      unSatisfactoryRoadTesting:[],
      trainer_id: [this.trainer_id],


    });
    this.evaluationFrom.valueChanges.subscribe((value) => {
      let sum = 0;
      let unSatSum = 0;


          if(value.leftTurns === 'true'){
            sum = +value.leftTurnsInput + sum;
          }else{
            unSatSum = +value.leftTurnsInput + unSatSum;
          }
          if(value.rightTurns === 'true'){
            sum = +value.rightTurnsInput + sum;
          }else{
            unSatSum = +value.rightTurnsInput + unSatSum;
          }
          if(value.intersectionStop === 'true'){
            sum = +value.intersectionStopInput + sum;
          }else{
            unSatSum = +value.intersectionStopInput + unSatSum;
          }
          if(value.intersectionThru === 'true'){
            sum = +value.intersectionThruInput + sum;
          }else{
            unSatSum = +value.intersectionThruInput + unSatSum;
          }
          if(value.interstate === 'true'){
            sum = +value.interstateInput + sum;
          }else{
            unSatSum = +value.interstateInput + unSatSum;
          }
          if(value.urbanBusiness === 'true'){
            sum = +value.urbanBusinessInput + sum;
          }else{
            unSatSum = +value.urbanBusinessInput + unSatSum;
          }
          if(value.lanceChanges === 'true'){
            sum = +value.lanceChangesInput + sum;
          }else{
            unSatSum = +value.lanceChangesInput + unSatSum;
          }
          if(value.curve === 'true'){
            sum = +value.curveInput + sum;
          }else{
            unSatSum = +value.curveInput + unSatSum;
          }
          if(value.roadside === 'true'){
            sum = +value.roadsideInput + sum;
          }else{
            unSatSum = +value.roadsideInput + unSatSum;
          }
          if(value.rrCrossing === 'true'){
            sum = +value.rrCrossingInput + sum;
          }else{
            unSatSum = +value.rrCrossingInput + unSatSum;
          }
          if(value.signs === 'true'){
            sum = +value.signsInput + sum;
          }else{
            unSatSum = +value.signsInput + unSatSum;
          }
          if(value.generalDriving === 'true'){
            sum = +value.generalDrivingInput + sum;
          }else{
            unSatSum = +value.generalDrivingInput + unSatSum;
          }
          if(value.eLogPractical === 'true'){
            sum = +value.eLogPracticalInput + sum;
          }else{
            unSatSum = +value.eLogPracticalInput + unSatSum;
          }
          this.totalSatisfactory = sum;
          this.totalUnSatisfactory = unSatSum;

    });
  }
endEvaluation(){
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
        this.loadingSpinner.next(false);

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

