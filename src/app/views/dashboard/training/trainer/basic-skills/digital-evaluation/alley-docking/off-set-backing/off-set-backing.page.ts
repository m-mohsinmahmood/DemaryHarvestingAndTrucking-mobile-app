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
  training_record: any;
  checkValue: any;


  public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute

    ) { }

    ngOnInit() {
      this.initForm()

      // query params
      this.route.queryParams.subscribe((params)=>{
        console.log(params);
        this.training_record_id = params.training_record_id;
      });

      // getting training record by id
    this.getRecord();
    }
    initForm(){
      this.basicSkillForm = this.formBuilder.group({
        pullUps_osb: [null,[Validators.required,Validators.pattern(('^([0-5])$'))]],
        encroach_osb: [null,[Validators.required,Validators.pattern(('^([0-5])$'))]],
        goal_osb: ['',[Validators.required]],
        finalPosition_osb: ['',[Validators.required]],
        straightLineBaking_osb: [''],
        straightLineBakingInput_osb: [''],
        alleyDocking_osb: [''],
        alleyDockingInput_osb: [''],
        offSetBacking_osb: [''],
        offSetBackingInput_osb: [''],
        parallelParkingBlind_osb: [''],
        parallelParkingBlindInput_osb: [''],
        coupUncoup_osb: [''],
        coupUncoupInput_osb: [''],
        comments_osb:[''],
        category:['off-set-backing'],
        satisfactoryOffSetBacking:[],
        unSatisfactoryOffSetBacking:[],
        trainer_id: [this.trainer_id]
      });
      this.basicSkillForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        // for input fields
        sum = +value.pullUps_osb +value.encroach_osb + +sum;
        this.totalSatisfactory = sum;

         // for checkboxes
         if(value.goal_osb === 'true'){
          this.checkValue = (value.goal_osb === 'true' && value.finalPosition_osb === 'true' && (+value.pullUps_osb +value.encroach_osb  <= 1) === true? 'true': 'false')
        }else{
          this.checkValue = 'false'
        }
        if(value.finalPosition_osb === 'true'){
          this.checkValue = (value.goal_osb === 'true' && value.finalPosition_osb === 'true' && (+value.pullUps_osb +value.encroach_osb  <= 1) === true? 'true': 'false')
        }else{
          this.checkValue = 'false'
        }
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
    getRecord() {
      this.trainingService
        .getRecordById(this.training_record_id)
        .subscribe((record) => {
          this.training_record = record[0];

          // patching
          this.basicSkillForm.patchValue({
            straightLineBaking_osb: (+this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb >= 2) && (this.training_record.goal_slb === 'false') && (this.training_record.finalPosition_slb === 'false') === false? 'false': 'true',
            straightLineBakingInput_osb: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb,
            alleyDocking_osb: (+this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad >= 2) && (this.training_record.goal_ad === 'false') && (this.training_record.finalPosition_ad === 'false') === false? 'false': 'true',
            alleyDockingInput_osb: +this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad,
          })
        });
    }

}
