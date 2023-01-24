/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-parking-blind',
  templateUrl: './parking-blind.page.html',
  styleUrls: ['./parking-blind.page.scss'],
})
export class ParkingBlindPage implements OnInit {

  buffer = 1;
  progress = 0.5000000000000001;
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
        pullUps_pb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        encroach_pb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        goal_pb: ['',[Validators.required]],
        finalPosition_pb: ['',[Validators.required]],
        straightLineBaking_pb: ['',[Validators.required]],
        straightLineBakingInput_pb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        alleyDocking_pb: ['',[Validators.required]],
        alleyDockingInput_pb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        offSetBacking_pb: ['',[Validators.required]],
        offSetBackingInput_pb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        parallelParkingBlind_pb: ['',[Validators.required]],
        parallelParkingBlindInput_pb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        coupUncoup_pb: ['',[Validators.required]],
        coupUncoupInput_pb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        comments_pb:[''],
        category:['parking-blind'],
        satisfactoryParkingBlind:[],
        unSatisfactoryParkingBlind:[],
        trainer_id: [this.trainer_id]
      });
      this.basicSkillForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        let unSatSum = 0;
        if(value.straightLineBaking_pb === 'true'){
          sum = +value.straightLineBakingInput_pb + sum;
        }else{
          unSatSum = +value.straightLineBakingInput_pb + unSatSum;
        }
        if(value.alleyDocking_pb === 'true'){
          sum = +value.alleyDockingInput_pb + sum;
        }else{
          unSatSum = +value.alleyDockingInput_pb + unSatSum;
        }
        if(value.offSetBacking_pb === 'true'){
          sum = +value.offSetBackingInput_pb + sum;
        }else{
          unSatSum = +value.offSetBackingInput_pb + unSatSum;
        }
        if(value.parallelParkingBlind_pb === 'true'){
          sum = +value.parallelParkingBlindInput_pb + sum;
        }else{
          unSatSum = +value.parallelParkingBlindInput_pb + unSatSum;
        }
        if(value.coupUncoup_pb === 'true'){
          sum = +value.coupUncoupInput_pb + sum;
        }else{
          unSatSum = +value.coupUncoupInput_pb + unSatSum;
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
    satisfactoryParkingBlind:this.totalSatisfactory,
    unSatisfactoryParkingBlind:this.totalUnSatisfactory
  });
      console.log(this.basicSkillForm.value);
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.toastService.presentToast(
              'Parking Blind details have been submitted',
              'success'
            );

            // navigating
         this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight');

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
