/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../../training.service';

@Component({
  selector: 'app-alley-docking',
  templateUrl: './alley-docking.page.html',
  styleUrls: ['./alley-docking.page.scss'],
})
export class AlleyDockingPage implements OnInit {
  buffer = 1;
  progress = 0.3333333333333334;
  feedbackValue: any;
  basicSkillForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService
    ) { }

    ngOnInit() {
      this.basicSkillForm = this.formBuilder.group({
        // pullUps: ['',[Validators.required]],
        // encroach: ['',[Validators.required]],
        // goal: ['',[Validators.required]],
        // finalPosition: ['',[Validators.required]],
        // straightLineBaking: ['',[Validators.required]],
        // straightLineBakingInput: ['',[Validators.required]],
        // alleyDocking: ['',[Validators.required]],
        // alleyDockingInput: ['',[Validators.required]],
        // offSetBacking: ['',[Validators.required]],
        // offSetBackingInput: ['',[Validators.required]],
        // parallelParkingBlind: ['',[Validators.required]],
        // parallelParkingBlindInput: ['',[Validators.required]],
        // coupUncoup: ['',[Validators.required]],
        // coupUncoupInput: ['',[Validators.required]],
        // alleyDockingComments:[''],
        pullUpsInput_ad: ['',[Validators.required]],
        encroachInput_ad: ['',[Validators.required]],
        goal_ad: ['',[Validators.required]],
        finalPosition_ad: ['',[Validators.required]],
        straightLineBacking_ad: ['',[Validators.required]],
        straightLineBakingInput_ad: ['',[Validators.required]], //<-
        alleyDocking_ad: ['',[Validators.required]],
        alleyDockingInput_ad: ['',[Validators.required]],
        offSetBacking_ad: ['',[Validators.required]],
        offSetBackingInput_ad: ['',[Validators.required]],
        parallelParkingBlind_ad: ['',[Validators.required]],
        parallelParkingBlindInput_ad: ['',[Validators.required]],
        coupUncoup_ad: ['',[Validators.required]],
        coupUncoupInput_ad: ['',[Validators.required]],
        comments_ad: [''],
        category:['alley-docking']
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
      console.log(this.basicSkillForm.value);
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing');
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.toastService.presentToast(
              'Alley Docking details have been submitted',
              'success'
            );

            // navigating
            this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing');

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
