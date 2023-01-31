/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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


  // trainer id
  trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute

  ) {}

  ngOnInit() {
    this.basicSkillForm = this.formBuilder.group({
      pullUpsInput_ad: [
        '',
        [Validators.required, Validators.pattern('^([1-5])$')],
      ],
      encroachInput_ad: [
        '',
        [Validators.required, Validators.pattern('^([1-5])$')],
      ],
      goal_ad: ['', [Validators.required]],
      finalPosition_ad: ['', [Validators.required]],
      straightLineBacking_ad: ['', [Validators.required]],
      straightLineBakingInput_ad: [
        '',
        [Validators.required, Validators.pattern('^([1-5])$')],
      ], //<-
      alleyDocking_ad: ['', [Validators.required]],
      alleyDockingInput_ad: [
        '',
        [Validators.required, Validators.pattern('^([1-5])$')],
      ],
      offSetBacking_ad: ['', [Validators.required]],
      offSetBackingInput_ad: [
        '',
        [Validators.required, Validators.pattern('^([1-5])$')],
      ],
      parallelParkingBlind_ad: ['', [Validators.required]],
      parallelParkingBlindInput_ad: [
        '',
        [Validators.required, Validators.pattern('^([1-5])$')],
      ],
      coupUncoup_ad: ['', [Validators.required]],
      coupUncoupInput_ad: [
        '',
        [Validators.required, Validators.pattern('^([1-5])$')],
      ],
      comments_ad: [''],
      category: ['alley-docking'],
      satisfactoryAlleyDocking: [],
      unSatisfactoryAlleyDocking: [],
      trainer_id: [this.trainer_id],
    });
    this.basicSkillForm.valueChanges.subscribe((value) => {
      let sum = 0;
      let unSatSum = 0;
      if (value.straightLineBacking_ad === 'true') {
        sum = +value.straightLineBakingInput_ad + sum;
      } else {
        unSatSum = +value.straightLineBakingInput_ad + unSatSum;
      }
      if (value.alleyDocking_ad === 'true') {
        sum = +value.alleyDockingInput_ad + sum;
      } else {
        unSatSum = +value.alleyDockingInput_ad + unSatSum;
      }
      if (value.offSetBacking_ad === 'true') {
        sum = +value.offSetBackingInput_ad + sum;
      } else {
        unSatSum = +value.offSetBackingInput_ad + unSatSum;
      }
      if (value.parallelParkingBlind_ad === 'true') {
        sum = +value.parallelParkingBlindInput_ad + sum;
      } else {
        unSatSum = +value.parallelParkingBlindInput_ad + unSatSum;
      }
      if (value.coupUncoup_ad === 'true') {
        sum = +value.coupUncoupInput_ad + sum;
      } else {
        unSatSum = +value.coupUncoupInput_ad + unSatSum;
      }
      this.totalSatisfactory = sum;
      this.totalUnSatisfactory = unSatSum;
    });
    this.route.queryParams.subscribe((params)=>{
      this.training_record_id = params.training_record_id;
    });
  }
  addFeedback() {
    this.feedbackValue = true;
  }
  navigate() {
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
            this.toastService.presentToast(
              'Alley Docking details have been submitted',
              'success'
            );

            // navigating
            // this.router.navigateByUrl(
            //   '/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing'
            // );
            this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing'],{
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
