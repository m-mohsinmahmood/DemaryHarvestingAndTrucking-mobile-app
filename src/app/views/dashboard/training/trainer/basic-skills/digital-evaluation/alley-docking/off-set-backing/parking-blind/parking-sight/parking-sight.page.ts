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
  progress = 0.8571428571428574;
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

  public loadingSpinner = new BehaviorSubject(false);
  public loading = new BehaviorSubject(true);


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
        pullUps_ps: [null,[Validators.required,Validators.pattern(('^([0-9])$'))]],
        encroach_ps: [null,[Validators.required,Validators.pattern(('^([0-9])$'))]],
        goal_ps: ['',[Validators.required]],
        finalPosition_ps: ['',[Validators.required]],
        straightLineBaking_ps: [''],
        straightLineBakingInput_ps: [''],
        alleyDocking_ps: [''],
        alleyDockingInput_ps: [''],
        alleyDocking90_ps: [''],
        alleyDockingInput90_ps: [''],
        offSetBacking_ps: [''],
        offSetBackingInput_ps: [''],
        parallelParkingBlind_ps: [''],
        parallelParkingBlindInput_ps: [''],
        parallelParkingBlind_pb: [''],
        parallelParkingBlindInput_pb: [''],
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
        if(value.goal_ps === 'true' && value.finalPosition_ps === 'true'){
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
    satisfactoryParkingSight:this.totalSatisfactory,
    unSatisfactoryParkingSight:this.totalUnSatisfactory
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
              'Parking Sight details have been submitted',
              'success'
            );

             // navigating
          if (this.isModalOpen === false) {
            setTimeout(()=>{
              this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup'],{
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
            straightLineBaking_ps: (this.training_record.goal_slb === 'true') && (this.training_record.finalPosition_slb === 'true') === true? 'true': 'false',
            straightLineBakingInput_ps: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb,
            alleyDocking_ps: (this.training_record.goal_ad === 'true') && (this.training_record.finalPosition_ad === 'true') === true? 'true': 'false',
            alleyDockingInput_ps: +this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad,
            alleyDocking90_ps:  (this.training_record.goal_ad90 === 'true') && (this.training_record.finalPosition_ad90 === 'true') === true? 'true': 'false',
            alleyDockingInput90_ps: +this.training_record.pullUpsInput_ad90 + +this.training_record.encroachInput_ad90,
            offSetBacking_ps:  (this.training_record.goal_osb === 'true') && (this.training_record.finalPosition_osb === 'true') === true? 'true': 'false',
            offSetBackingInput_ps: +this.training_record.pullUps_osb + +this.training_record.encroach_osb,
            parallelParkingBlind_pb:  (this.training_record.goal_pb === 'true') && (this.training_record.finalPosition_pb === 'true') === true? 'true': 'false',
            parallelParkingBlindInput_pb: +this.training_record.pullUps_pb + +this.training_record.encroach_pb,
          });
        });
    }

}
