/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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

      //query params
      this.route.queryParams.subscribe((params)=>{
        this.training_record_id = params.training_record_id;
      });

      // getting training record by id
    this.getRecord();
    }
    initForm(){
      this.basicSkillForm = this.formBuilder.group({
        pullUps_ps: [null,[Validators.required,Validators.pattern(('^([0-5])$'))]],
        encroach_ps: [null,[Validators.required,Validators.pattern(('^([0-5])$'))]],
        goal_ps: ['',[Validators.required]],
        finalPosition_ps: ['',[Validators.required]],
        straightLineBaking_ps: [''],
        straightLineBakingInput_ps: [''],
        alleyDocking_ps: [''],
        alleyDockingInput_ps: [''],
        offSetBacking_ps: [''],
        offSetBackingInput_ps: [''],
        parallelParkingBlind_pb: [''],
        parallelParkingBlindInput_pb: [''],
        parallelParkingBlind_ps: [''],
        parallelParkingBlindInput_ps: [''],
        coupUncoup_ps: [''],
        coupUncoupInput_ps: [''],
        comments_ps:[''],
        category:['parking-sight'],
        satisfactoryParkingSight:[],
        unSatisfactoryParkingSight:[],
        trainer_id: [this.trainer_id]

      });
      this.basicSkillForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        // for input fields
        sum = +value.pullUps_ps +value.encroach_ps + +sum;
        this.totalSatisfactory = sum;

        // for checkboxes
        if(value.goal_ps === 'true'){
          this.checkValue = (value.goal_ps === 'true' && value.finalPosition_ps === 'true' && (+value.pullUps_ps +value.encroach_ps  <= 1) === true? 'true': 'false')
        }else{
          this.checkValue = 'false'
        }
        if(value.finalPosition_ps === 'true'){
          this.checkValue = (value.goal_ps === 'true' && value.finalPosition_ps === 'true' && (+value.pullUps_ps +value.encroach_ps  <= 1) === true? 'true': 'false')
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
    satisfactoryParkingSight:this.totalSatisfactory,
    unSatisfactoryParkingSight:this.totalUnSatisfactory
  });

      console.log(this.basicSkillForm.value);
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            this.toastService.presentToast(
              'Parking Sight details have been submitted',
              'success'
            );

            // navigating
            // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup');
            this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup'],{
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
          console.log('Record::', this.training_record);
          // patching
          this.basicSkillForm.patchValue({
            straightLineBaking_ps: (+this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb >= 2) && (this.training_record.goal_slb === 'false') && (this.training_record.finalPosition_slb === 'false') === false? 'false': 'true',
            straightLineBakingInput_ps: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb,
            alleyDocking_ps: (+this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad >= 2) && (this.training_record.goal_ad === 'false') && (this.training_record.finalPosition_ad === 'false') === false? 'false': 'true',
            alleyDockingInput_ps: +this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad,
            offSetBacking_ps: (+this.training_record.encroach_osb + +this.training_record.encroach_osb >= 2) && (this.training_record.goal_osb === 'false') && (this.training_record.finalPosition_osb === 'false') === false? 'false': 'true',
            offSetBackingInput_ps: +this.training_record.pullUps_osb + +this.training_record.encroach_osb,
            parallelParkingBlind_pb: (+this.training_record.pullUps_pb + +this.training_record.encroach_pb >= 2) && (this.training_record.goal_pb === 'false') && (this.training_record.finalPosition_pb === 'false') === false? 'false': 'true',
            parallelParkingBlindInput_pb: +this.training_record.pullUps_pb + +this.training_record.encroach_pb,
          })
        });
    }

}
