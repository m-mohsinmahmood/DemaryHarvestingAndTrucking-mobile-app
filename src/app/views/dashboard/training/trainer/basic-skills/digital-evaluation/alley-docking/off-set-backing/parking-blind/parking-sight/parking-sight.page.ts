/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-parking-sight',
  templateUrl: './parking-sight.page.html',
  styleUrls: ['./parking-sight.page.scss'],
})
export class ParkingSightPage implements OnInit {

  buffer = 1;
  progress = 0.8;
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
        pullUps_ps: ['',[Validators.required]],
        encroach_ps: ['',[Validators.required]],
        goal_ps: ['',[Validators.required]],
        finalPosition_ps: ['',[Validators.required]],
        straightLineBaking_ps: ['',[Validators.required]],
        straightLineBakingInput_ps: ['',[Validators.required]],
        alleyDocking_ps: ['',[Validators.required]],
        alleyDockingInput_ps: ['',[Validators.required]],
        offSetBacking_ps: ['',[Validators.required]],
        offSetBackingInput_ps: ['',[Validators.required]],
        parallelParkingBlind_ps: ['',[Validators.required]],
        parallelParkingBlindInput_ps: ['',[Validators.required]],
        coupUncoup_ps: ['',[Validators.required]],
        coupUncoupInput_ps: ['',[Validators.required]],
        comments_ps:[''],
        category:['parking-sight']

      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
      console.log(this.basicSkillForm.value);
      // eslint-disable-next-line max-len
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup');
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.toastService.presentToast(
              'Parking Sight details have been submitted',
              'success'
            );

            // navigating
            this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup');

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
