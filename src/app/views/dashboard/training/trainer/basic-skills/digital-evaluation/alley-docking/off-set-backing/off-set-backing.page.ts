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
  progress = 0.4285714285714287;
  feedbackValue: any;
  basicSkillsForm: FormGroup;
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
      this.basicSkillsForm = this.formBuilder.group({
        pullUps_osb: [null,[Validators.required,Validators.pattern(('^([0-9])$'))]],
        encroach_osb: [null,[Validators.required,Validators.pattern(('^([0-9])$'))]],
        goal_osb: ['',[Validators.required]],
        finalPosition_osb: ['',[Validators.required]],
        straightLineBaking_osb: [''],
        straightLineBakingInput_osb: [''],
        alleyDocking_osb: [''],
        alleyDockingInput_osb: [''],
        alleyDocking90_osb: [''],
        alleyDockingInput90_osb: [''],
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
      this.basicSkillsForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        // for input fields
        sum = +value.pullUps_osb +value.encroach_osb + +sum;
        this.totalSatisfactory = sum;

         // for checkboxes
        if(value.goal_osb === 'true' && value.finalPosition_osb === 'true'){
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
  this.basicSkillsForm.patchValue({
    satisfactoryOffSetBacking:this.totalSatisfactory,
    unSatisfactoryOffSetBacking:this.totalUnSatisfactory
  });
      console.log(this.basicSkillsForm.value);
      this.trainingService.saveFroms(this.basicSkillsForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            // closing modal
          this.isModalOpen = false;

           // spinner
           this.loadingSpinner.next(false);

          // tooltip
            this.loadingSpinner.next(false);
            this.toastService.presentToast(
              'Off-set backing details have been submitted',
              'success'
            );

          // navigating
          if (this.isModalOpen === false) {
            setTimeout(()=>{
              this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind'],{
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
          this.basicSkillsForm.patchValue({
            straightLineBaking_osb: (this.training_record.goal_slb === 'true') && (this.training_record.finalPosition_slb === 'true') === true? 'true': 'false',
            straightLineBakingInput_osb: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb,
            alleyDocking_osb:  (this.training_record.goal_ad === 'true') && (this.training_record.finalPosition_ad === 'true') === true? 'true': 'false',
            alleyDockingInput_osb: +this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad,
            alleyDocking90_osb: (this.training_record.goal_ad90 === 'true') && (this.training_record.finalPosition_ad90 === 'true') === true? 'true': 'false',
            alleyDockingInput90_osb: +this.training_record.pullUpsInput_ad90 + +this.training_record.encroachInput_ad90,
          });
        });
    }

}
