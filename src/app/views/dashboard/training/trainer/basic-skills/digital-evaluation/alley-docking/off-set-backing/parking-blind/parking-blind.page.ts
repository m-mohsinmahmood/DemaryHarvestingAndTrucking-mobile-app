/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-parking-blind',
  templateUrl: './parking-blind.page.html',
  styleUrls: ['./parking-blind.page.scss'],
})
export class ParkingBlindPage implements OnInit {
  buffer = 1;
  progress = 0.7142857142857145;
  feedbackValue: any;
  basicSkillForm: FormGroup;

  totalSatisfactory = 0;
  totalUnSatisfactory = 0;
  trainer_id;
  supervisor_id;
  math = Math;
  training_record_id: any;
  training_record: any;
  checkValue: any;
  isModalOpen = false;

  // behaviour subject's
  public loadingSpinner = new BehaviorSubject(false);
  // public loading = new BehaviorSubject(true);


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute

    ) {
    }

    ngOnInit() {
       // getting id & role
     this.getRoleAndID();

     this.initForm();

      //query params
      this.route.queryParams.subscribe((params)=>{
        this.training_record_id = params.training_record_id;
        this.supervisor_id = params.supervisor_id;

      });

    // getting training record by id
    this.getRecord();
    }
    async ionViewDidEnter() {
      this.getRoleAndID();
    }
    getRoleAndID(){
      this.trainer_id = localStorage.getItem('employeeId');
    }
    initForm(){
      this.basicSkillForm = this.formBuilder.group({
        pullUps_pb: [null,[Validators.required,Validators.pattern(('^([0-9])$'))]],
        encroach_pb: [null,[Validators.required,Validators.pattern(('^([0-9])$'))]],
        goal_pb: ['',[Validators.required]],
        finalPosition_pb: ['',[Validators.required]],
        straightLineBaking_pb: [''],
        straightLineBakingInput_pb: [''],
        alleyDocking_pb: [''],
        alleyDockingInput_pb: [''],
        alleyDocking90_pb: [''],
        alleyDockingInput90_pb: [''],
        offSetBacking_pb: [''],
        offSetBackingInput_pb: [''],
        parallelParkingBlind_pb: [''],
        parallelParkingBlindInput_pb: [''],
        coupUncoup_pb: [''],
        coupUncoupInput_pb: [''],
        comments_pb:[''],
        category:['parking-blind'],
        satisfactoryParkingBlind:[],
        unSatisfactoryParkingBlind:[],
        trainer_id: [this.trainer_id]
      });
      this.basicSkillForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        console.log('value:',value);
        // for input fields
        sum = +value.pullUps_pb +value.encroach_pb + +sum;
        this.totalSatisfactory = sum;

        // for checkboxes
        if(value.goal_pb === 'true' && value.finalPosition_pb === 'true'){
          this.checkValue = 'true';
        }else{
            this.checkValue = 'false';
          }
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    next(){
      this.isModalOpen = true;
    }
    edit(){
      this.isModalOpen = false;
    }
    navigate() {
      this.loadingSpinner.next(true);

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
                   // closing modal
          this.isModalOpen = false;

          // spinner
          this.loadingSpinner.next(false);

          // tooltip
            this.toastService.presentToast(
              'Parking Blind details have been submitted',
              'success'
            );

        // navigating
        if (this.isModalOpen === false) {
          setTimeout(()=>{
            this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight'],{
              queryParams:{
                training_record_id: this.training_record_id,
                supervisor_id: this.supervisor_id

              }
            });
          },500);
        }
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
          this.training_record = record.summary[0];

          // patching
          this.basicSkillForm.patchValue({
            straightLineBaking_pb: (this.training_record.goal_slb === 'true') && (this.training_record.finalPosition_slb === 'true') === true? 'true': 'false',
            straightLineBakingInput_pb: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb,
            alleyDocking_pb: (this.training_record.goal_ad === 'true') && (this.training_record.finalPosition_ad === 'true') === true? 'true': 'false',
            alleyDockingInput_pb: +this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad,
            alleyDocking90_pb:  (this.training_record.goal_ad90 === 'true') && (this.training_record.finalPosition_ad90 === 'true') === true? 'true': 'false',
            alleyDockingInput90_pb: +this.training_record.pullUpsInput_ad90 + +this.training_record.encroachInput_ad90,
            offSetBacking_pb:  (this.training_record.goal_osb === 'true') && (this.training_record.finalPosition_osb === 'true') === true? 'true': 'false',
            offSetBackingInput_pb: +this.training_record.pullUps_osb + +this.training_record.encroach_osb,
          });
        });
    }

}
