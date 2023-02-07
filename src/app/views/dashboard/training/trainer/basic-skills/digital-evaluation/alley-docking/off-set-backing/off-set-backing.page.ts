/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-off-set-backing',
  templateUrl: './off-set-backing.page.html',
  styleUrls: ['./off-set-backing.page.scss'],
})
export class OffSetBackingPage implements OnInit {

  buffer = 1;
  progress = 0.3333333333333334;
  feedbackValue: any;
  basicSkillForm: FormGroup;
  totalSatisfactory = 0;
  totalUnSatisfactory = 0;
  // trainer id
  trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';
  math = Math;
  training_record_id: any;
  public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute

    ) { }

    ngOnInit() {
      this.basicSkillForm = this.formBuilder.group({
        pullUps_osb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        encroach_osb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        goal_osb: ['',[Validators.required]],
        finalPosition_osb: ['',[Validators.required]],
        straightLineBaking_osb: ['',[Validators.required]],
        straightLineBakingInput_osb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        alleyDocking_osb: ['',[Validators.required]],
        alleyDockingInput_osb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        offSetBacking_osb: ['',[Validators.required]],
        offSetBackingInput_osb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        parallelParkingBlind_osb: ['',[Validators.required]],
        parallelParkingBlindInput_osb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        coupUncoup_osb: ['',[Validators.required]],
        coupUncoupInput_osb: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        comments_osb:[''],
        category:['off-set-backing'],
        satisfactoryOffSetBacking:[],
        unSatisfactoryOffSetBacking:[],
        trainer_id: [this.trainer_id]
      });
      this.basicSkillForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        let unSatSum = 0;
        if(value.straightLineBaking_osb === 'true'){
          sum = +value.straightLineBakingInput_osb + sum;
        }else{
          unSatSum = +value.straightLineBakingInput_osb + unSatSum;
        }
        if(value.alleyDocking_osb === 'true'){
          sum = +value.alleyDockingInput_osb + sum;
        }else{
          unSatSum = +value.alleyDockingInput_osb + unSatSum;
        }
        if(value.offSetBacking_osb === 'true'){
          sum = +value.offSetBackingInput_osb + sum;
        }else{
          unSatSum = +value.offSetBackingInput_osb + unSatSum;
        }
        if(value.parallelParkingBlind_osb === 'true'){
          sum = +value.parallelParkingBlindInput_osb + sum;
        }else{
          unSatSum = +value.parallelParkingBlindInput_osb + unSatSum;
        }
        if(value.coupUncoup_osb === 'true'){
          sum = +value.coupUncoupInput_osb + sum;
        }else{
          unSatSum = +value.coupUncoupInput_osb + unSatSum;
        }
        this.totalSatisfactory = sum;
          this.totalUnSatisfactory = unSatSum;
      });
      this.route.queryParams.subscribe((params)=>{
        this.training_record_id = params.training_record_id;
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
      this.loadingSpinner.next(true);

  // patching sat & un-sat results
  this.basicSkillForm.patchValue({
    satisfactoryOffSetBacking:this.totalSatisfactory,
    unSatisfactoryOffSetBacking:this.totalUnSatisfactory
  });
      console.log(this.basicSkillForm.value);
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);
            this.toastService.presentToast(
              'Off-set backing details have been submitted',
              'success'
            );

            // navigating
          //  this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind');
           this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind'],{
            queryParams:{
              training_record_id: this.training_record_id
            }
          });
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
