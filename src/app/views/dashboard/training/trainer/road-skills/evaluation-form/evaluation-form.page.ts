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
 result;
 finalResult;

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
      leftTurnsInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      rightTurns: ['',[Validators.required]],
      rightTurnsInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      intersectionStop: ['',[Validators.required]],
      intersectionStopInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      intersectionThru: ['',[Validators.required]],
      intersectionThruInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      interstate: ['',[Validators.required]],
      interstateInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      urbanBusiness: ['',[Validators.required]],
      urbanBusinessInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      lanceChanges: ['',[Validators.required]],
      lanceChangesInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      curve: ['',[Validators.required]],
      curveInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      roadside: ['',[Validators.required]],
      roadsideInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      rrCrossing: ['',[Validators.required]],
      rrCrossingInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      signs: ['',[Validators.required]],
      signsInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      generalDriving: ['',[Validators.required]],
      generalDrivingInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      eLogPractical: ['',[Validators.required]],
      eLogPracticalInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      cognizantDriving: ['',[Validators.required]],
      cognizantDrivingInput: ['0',[Validators.required,Validators.pattern('^([0-5])$')]],
      category:['road-testing'],
      satisfactoryRoadTesting:[],
      unSatisfactoryRoadTesting:[],
      trainer_id: [this.trainer_id],
      sumRoadSkills:[''],
      finalResultRoadSkills:['']

    });


    this.evaluationFrom.valueChanges.subscribe((val)=>{
      let sum = 0;
      sum = +val.leftTurnsInput +
      +val.rightTurnsInput +
      +val.intersectionStopInput +
      +val.intersectionThruInput +
      +val.interstateInput +
      +val.urbanBusinessInput +
      +val.lanceChangesInput +
      +val.curveInput +
      +val.roadsideInput +
      +val.rrCrossingInput +
      +val.signsInput +
      +val.generalDrivingInput +
      +val.eLogPracticalInput +
      +val.cognizantDrivingInput +sum;
      this.result = sum;

      if(
        this.result <=25
      ){
        this.finalResult = true;
      }
      else{
        this.finalResult = false;
      }
    });
  }
  endEvaluation(){
    this.loadingSpinner.next(true);

      // get check-in ID
      this.getCheckInID();

  }
submitData(){
  console.log(this.evaluationFrom.value);

  // patching sat & un-sat results
  this.evaluationFrom.patchValue({
    satisfactoryRoadTesting:this.totalSatisfactory,
    unSatisfactoryRoadTesting:this.totalUnSatisfactory,
    sumRoadSkills: this.result,
    finalResultRoadSkills: this.finalResult
  });
  console.log(this.evaluationFrom.value);
  this.trainingService.saveFroms(this.evaluationFrom.value, 'road-skills').subscribe(
    (res) => {
      console.log('RES:', res);
      if (res.status === 200) {
        // spinner
        this.loadingSpinner.next(false);

        // create DWR
        this.createDWR();

      } else {
        console.log('Something happened :)');
        this.loadingSpinner.next(false);

        this.toastService.presentToast(res.mssage, 'danger');
      }
    },
    (err) => {
      console.log('ERROR::', err);
      this.loadingSpinner.next(false);

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

     // submit data
     this.submitData();
  });

}

createDWR(){
  this.trainingService
   .createDWR(this.trainer_id, this.training_record_id,'','','road-skills','digital-form',this.supervisor_id,this.active_check_in_id)
   .subscribe(
     (res) => {
       if (res.status === 200) {

      // to stop loader
      this.loadingSpinner.next(false);

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

