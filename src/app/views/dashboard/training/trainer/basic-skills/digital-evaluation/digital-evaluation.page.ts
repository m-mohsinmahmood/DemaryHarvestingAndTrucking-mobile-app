/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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

 public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute

    ) { }

  ngOnInit() {
    this.initForms()

    // query params
    this.route.queryParams.subscribe((params)=>{
      console.log('object',params);
      this.training_record_id = params.training_record_id;
    });
  }
  initForms(){
    this.basicSkillForm = this.formBuilder.group({
      pullUpsInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      encroachInput_slb: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      goal_slb: ['',[Validators.required]],
      finalPosition_slb: ['',[Validators.required]],
      straightLineBacking_slb: [''],
      straightLineBakingInput_slb: [''], //<-
      alleyDocking_slb: [''],
      alleyDockingInput_slb: [''],
      offSetBacking_slb: [''],
      offSetBackingInput_slb: [''],
      parallelParkingBlind_slb: [''],
      parallelParkingBlindInput_slb: [''],
      coupUncoup_slb: [''],
      coupUncoupInput_slb: [''],
      comments_slb: [''],
      category:['straight-line-backing'],
      satisfactoryStraightLineBacking:[],
      unSatisfactoryStraightLineBacking:[],
      trainer_id: [this.trainer_id]
    });
    this.basicSkillForm.valueChanges.subscribe((value)=>{
      let sum = 0;
        sum = +value.pullUpsInput_slb +value.encroachInput_slb + +sum;
        this.totalSatisfactory = sum;

    });
  }
  navigate() {
    console.log(this.basicSkillForm.value);

    this.loadingSpinner.next(true);

    // patching sat & un-sat results
  this.basicSkillForm.patchValue({
    satisfactoryStraightLineBacking:this.totalSatisfactory,
    unSatisfactoryStraightLineBacking:this.totalUnSatisfactory
  });

    this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.loadingSpinner.next(false);

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
