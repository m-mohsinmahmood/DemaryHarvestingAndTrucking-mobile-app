/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../training.service';

@Component({
  selector: 'app-digital-evaluation',
  templateUrl: './digital-evaluation.page.html',
  styleUrls: ['./digital-evaluation.page.scss'],
})
export class DigitalEvaluationPage implements OnInit {
  basicSkillForm: FormGroup;
  value;
  buffer = 1;
  progress = 0;
  text=0;
  feedbackValue: any;

  totalSatisfactory = 0;
totalUnSatisfactory = 0;
training_record_id: any;

 // trainer id
 trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute

    ) { }

  ngOnInit() {
    this.basicSkillForm = this.formBuilder.group({
      pullUpsInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      encroachInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      goal_slb: ['',[Validators.required]],
      finalPosition_slb: ['',[Validators.required]],
      straightLineBacking_slb: ['',[Validators.required]],
      straightLineBakingInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]], //<-
      alleyDocking_slb: ['',[Validators.required]],
      alleyDockingInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      offSetBacking_slb: ['',[Validators.required]],
      offSetBackingInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      parallelParkingBlind_slb: ['',[Validators.required]],
      parallelParkingBlindInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      coupUncoup_slb: ['',[Validators.required]],
      coupUncoupInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      comments_slb: [''],
      category:['straight-line-backing'],
      satisfactoryStraightLineBacking:[],
      unSatisfactoryStraightLineBacking:[],
      trainer_id: [this.trainer_id]
    });
    this.basicSkillForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      let unSatSum = 0;
      if(value.straightLineBacking_slb === 'true'){
        sum = +value.straightLineBakingInput_slb + sum;
      }else{
        unSatSum = +value.straightLineBakingInput_slb + unSatSum;
      }
      if(value.alleyDocking_slb === 'true'){
        sum = +value.alleyDockingInput_slb + sum;
      }else{
        unSatSum = +value.alleyDockingInput_slb + unSatSum;
      }
      if(value.offSetBacking_slb === 'true'){
        sum = +value.offSetBackingInput_slb + sum;
      }else{
        unSatSum = +value.offSetBackingInput_slb + unSatSum;
      }
      if(value.parallelParkingBlind_slb === 'true'){
        sum = +value.parallelParkingBlindInput_slb + sum;
      }else{
        unSatSum = +value.parallelParkingBlindInput_slb + unSatSum;
      }
      if(value.coupUncoup_slb === 'true'){
        sum = +value.coupUncoupInput_slb + sum;
      }else{
        unSatSum = +value.coupUncoupInput_slb + unSatSum;
      }
      this.totalSatisfactory = sum;
      this.totalUnSatisfactory = unSatSum;
    });

    this.route.queryParams.subscribe((params)=>{
      this.training_record_id = params.training_record_id;
    });
  }
  navigate() {
    console.log(this.basicSkillForm.value);
    // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking');

    // patching sat & un-sat results
  this.basicSkillForm.patchValue({
    satisfactoryStraightLineBacking:this.totalSatisfactory,
    unSatisfactoryStraightLineBacking:this.totalUnSatisfactory
  });

    this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Straight Line Backing details have been submitted',
            'success'
          );

          // navigating
        //  this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking');
        this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking'],{
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
  addFeedback(){
    this.feedbackValue = true;
  }
  submit(){
    console.log(this.basicSkillForm.value);
  }
}
