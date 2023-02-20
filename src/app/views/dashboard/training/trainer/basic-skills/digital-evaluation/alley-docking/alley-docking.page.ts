/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../../training.service';

@Component({
  selector: 'app-alley-docking',
  templateUrl: './alley-docking.page.html',
  styleUrls: ['./alley-docking.page.scss'],
})
export class AlleyDockingPage implements OnInit {
  buffer = 1;
  progress = 0.1666666666666667;
  feedbackValue: any;
  basicSkillForm: FormGroup;
  totalSatisfactory = 0;
  totalUnSatisfactory = 0;
  math = Math;
  training_record_id: any;
  training_record: any;
  // trainer id
  trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';

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
    this.initForms();

    // query params
    this.route.queryParams.subscribe((params) => {
      this.training_record_id = params.training_record_id;
    });

    // getting training record by id
    this.getRecord();
  }
  initForms() {
    this.basicSkillForm = this.formBuilder.group({
      pullUpsInput_ad: [
        null,
        [Validators.required, Validators.pattern('^([0-5])$')],
      ],
      encroachInput_ad: [
        null,
        [Validators.required, Validators.pattern('^([0-5])$')],
      ],
      goal_ad: [null, [Validators.required]],
      finalPosition_ad: [null, [Validators.required]],
      straightLineBacking_ad: [''],
      straightLineBakingInput_ad: [''], //<-
      alleyDocking_ad: [''],
      alleyDockingInput_ad: [''],
      offSetBacking_ad: [''],
      offSetBackingInput_ad: [''],
      parallelParkingBlind_ad: [''],
      parallelParkingBlindInput_ad: [''],
      coupUncoup_ad: [''],
      coupUncoupInput_ad: [''],
      comments_ad: [''],
      category: ['alley-docking'],
      satisfactoryAlleyDocking: [],
      unSatisfactoryAlleyDocking: [],
      trainer_id: [this.trainer_id],
    });
    this.basicSkillForm.valueChanges.subscribe((value) => {
      let sum = 0;
        // for input fields
        sum = +value.pullUpsInput_ad +value.encroachInput_ad + +sum;
        this.totalSatisfactory = sum;

         // for checkboxes
         if(value.goal_ad === 'true'){
          this.checkValue = (value.goal_ad === 'true' && value.finalPosition_ad === 'true' && (+value.pullUpsInput_ad +value.encroachInput_ad  <= 1) === true? 'true': 'false')
        }else{
          this.checkValue = 'false'
        }
        if(value.finalPosition_ad === 'true'){
          this.checkValue = (value.goal_ad === 'true' && value.finalPosition_ad === 'true' && (+value.pullUpsInput_ad +value.encroachInput_ad  <= 1) === true? 'true': 'false')
        }else{
          this.checkValue = 'false'
        }

    });
  }
  addFeedback() {
    this.feedbackValue = true;
  }
  navigate() {
    this.loadingSpinner.next(true);

    // patching sat & un-sat results
    this.basicSkillForm.patchValue({
      satisfactoryAlleyDocking: this.totalSatisfactory,
      unSatisfactoryAlleyDocking: this.totalUnSatisfactory,
    });

    console.log(this.basicSkillForm.value);
    this.trainingService
      .saveFroms(this.basicSkillForm.value, 'basic-skills')
      .subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            this.toastService.presentToast(
              'Alley Docking details have been submitted',
              'success'
            );

            // navigating
            // this.router.navigateByUrl(
            //   '/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing'
            // );
            this.router.navigate(
              [
                '/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing',
              ],
              {
                queryParams: {
                  training_record_id: this.training_record_id,
                },
              }
            );
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
          straightLineBacking_ad: (+this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb >= 2) && (this.training_record.goal_slb === 'false') && (this.training_record.finalPosition_slb === 'false') === false? 'false': 'true',
          straightLineBakingInput_ad: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb
        })
      });
  }
}
