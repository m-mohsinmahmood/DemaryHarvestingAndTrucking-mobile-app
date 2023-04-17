/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-alley-docking90',
  templateUrl: './alley-docking90.page.html',
  styleUrls: ['./alley-docking90.page.scss'],
})
export class AlleyDocking90Page implements OnInit {
  buffer = 1;
  progress = 0.1666666666666667;
  feedbackValue: any;
  basicSkillForm: FormGroup;
  totalSatisfactory = 0;
  totalUnSatisfactory = 0;
  math = Math;
  training_record_id: any;
  training_record: any;
  trainer_id;
 supervisor_id;
  isModalOpen = false;

  // behaviour subject's
  public loadingSpinner = new BehaviorSubject(false);
  // public loading = new BehaviorSubject(true);
  checkValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     // getting id & role
     this.getRoleAndID();

     this.initForms();

    // query params
    this.route.queryParams.subscribe((params) => {
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
  initForms() {
    this.basicSkillForm = this.formBuilder.group({
      pullUpsInput_ad90: [
        null,
        [Validators.required, Validators.pattern('^([0-5])$')],
      ],
      encroachInput_ad90: [
        null,
        [Validators.required, Validators.pattern('^([0-5])$')],
      ],
      goal_ad90: [null, [Validators.required]],
      finalPosition_ad90: [null, [Validators.required]],
      straightLineBacking_ad: [''],
      straightLineBakingInput_ad: [''], //<-
      alleyDocking_ad: [''],
      alleyDockingInput_ad: [''],
      alleyDocking_ad90: [''],
      alleyDockingInput_ad90: [''],
      offSetBacking_ad: [''],
      offSetBackingInput_ad: [''],
      parallelParkingBlind_ad: [''],
      parallelParkingBlindInput_ad: [''],
      coupUncoup_ad: [''],
      coupUncoupInput_ad: [''],
      comments_ad: [''],
      comments_ad90: [''],
      category: ['alley-docking-90'],
      // satisfactoryAlleyDocking: [],
      // unSatisfactoryAlleyDocking: [],
      satisfactoryAlleyDocking90: [],
      unSatisfactoryAlleyDocking90: [],
      trainer_id: [this.trainer_id],
    });
    this.basicSkillForm.valueChanges.subscribe((value) => {
      let sum = 0;

        // for input fields
        sum = +value.pullUpsInput_ad90 +value.encroachInput_ad90 + +sum;
        this.totalSatisfactory = sum;

         // for checkboxes
         if(value.goal_ad90 === 'true'){
          this.checkValue = (value.goal_ad90 === 'true' && value.finalPosition_ad90 === 'true' && (+value.pullUpsInput_ad90 +value.encroachInput_ad90  <= 2) === true? 'true': 'false');

        }else{
          this.checkValue = 'false';
        }

        if(value.finalPosition_ad90 === 'true'){
          this.checkValue = (value.goal_ad90 === 'true' && value.finalPosition_ad90 === 'true' && (+value.pullUpsInput_ad90 +value.encroachInput_ad90  <= 2) === true? 'true': 'false');
        }else{
          this.checkValue = 'false';
        }

    });
  }
  addFeedback() {
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
      satisfactoryAlleyDocking90: this.totalSatisfactory,
      unSatisfactoryAlleyDocking90: this.totalUnSatisfactory,
    });

    console.log(this.basicSkillForm.value);
    this.trainingService
      .saveFroms(this.basicSkillForm.value, 'basic-skills')
      .subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            // closing modal
          this.isModalOpen = false;

           // spinner
            this.loadingSpinner.next(false);

            // tooltip
            this.toastService.presentToast(
              'Alley Docking details have been submitted',
              'success'
            );

            // navigating
            if (this.isModalOpen === false) {
              setTimeout(()=>{
                this.router.navigate(
                  [
                    '/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing',
                  ],
                  {
                    queryParams: {
                      training_record_id: this.training_record_id,
                      supervisor_id: this.supervisor_id
                    },
                  }
                );
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
        this.training_record = record[0];

        // patching
        this.basicSkillForm.patchValue({
          straightLineBacking_ad: (+this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb < 3) && (this.training_record.goal_slb === 'true') && (this.training_record.finalPosition_slb === 'true') === true? 'true': 'false',
          straightLineBakingInput_ad: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb,
          alleyDocking_ad: (+this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad < 3) && (this.training_record.goal_ad === 'true') && (this.training_record.finalPosition_ad === 'true') === true? 'true': 'false',
          alleyDockingInput_ad: +this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad,
        });
      });
  }
}
