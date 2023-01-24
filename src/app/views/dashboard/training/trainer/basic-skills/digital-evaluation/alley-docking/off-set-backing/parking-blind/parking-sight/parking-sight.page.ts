/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-parking-sight',
  templateUrl: './parking-sight.page.html',
  styleUrls: ['./parking-sight.page.scss'],
})
export class ParkingSightPage implements OnInit {

  buffer = 1;
  progress = 0.6666666666666668;
  feedbackValue: any;
  basicSkillForm: FormGroup;

  totalSatisfactory = 0;
  totalUnSatisfactory = 0;
  // trainer id
  trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';
  math = Math;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService
    ) { }

    ngOnInit() {
      this.basicSkillForm = this.formBuilder.group({
        pullUps_ps: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        encroach_ps: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        goal_ps: ['',[Validators.required]],
        finalPosition_ps: ['',[Validators.required]],
        straightLineBaking_ps: ['',[Validators.required]],
        straightLineBakingInput_ps: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        alleyDocking_ps: ['',[Validators.required]],
        alleyDockingInput_ps: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        offSetBacking_ps: ['',[Validators.required]],
        offSetBackingInput_ps: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        parallelParkingBlind_ps: ['',[Validators.required]],
        parallelParkingBlindInput_ps: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        coupUncoup_ps: ['',[Validators.required]],
        coupUncoupInput_ps: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        comments_ps:[''],
        category:['parking-sight'],
        satisfactoryParkingSight:[],
        unSatisfactoryParkingSight:[],
        trainer_id: [this.trainer_id]

      });
      this.basicSkillForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        let unSatSum = 0;
        if(value.straightLineBaking_ps === 'true'){
          sum = +value.straightLineBakingInput_ps + sum;
        }else{
          unSatSum = +value.straightLineBakingInput_ps + unSatSum;
        }
        if(value.alleyDocking_ps === 'true'){
          sum = +value.alleyDockingInput_ps + sum;
        }else{
          unSatSum = +value.alleyDockingInput_ps + unSatSum;
        }
        if(value.offSetBacking_ps === 'true'){
          sum = +value.offSetBackingInput_ps + sum;
        }else{
          unSatSum = +value.offSetBackingInput_ps + unSatSum;
        }
        if(value.parallelParkingBlind_ps === 'true'){
          sum = +value.parallelParkingBlindInput_ps + sum;
        }else{
          unSatSum = +value.parallelParkingBlindInput_ps + unSatSum;
        }
        if(value.coupUncoup_ps === 'true'){
          sum = +value.coupUncoupInput_ps + sum;
        }else{
          unSatSum = +value.coupUncoupInput_ps + unSatSum;
        }
        this.totalSatisfactory = sum;
          this.totalUnSatisfactory = unSatSum;
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
       // patching sat & un-sat results
  this.basicSkillForm.patchValue({
    satisfactoryParkingSight:this.totalSatisfactory,
    unSatisfactoryParkingSight:this.totalUnSatisfactory
  });

      console.log(this.basicSkillForm.value);
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.toastService.presentToast(
              'Parking Sight details have been submitted',
              'success'
            );

            // navigating
            this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup');

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

}
