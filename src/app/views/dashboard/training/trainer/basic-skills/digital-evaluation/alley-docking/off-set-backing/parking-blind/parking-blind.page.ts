/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-parking-blind',
  templateUrl: './parking-blind.page.html',
  styleUrls: ['./parking-blind.page.scss'],
})
export class ParkingBlindPage implements OnInit {

  buffer = 1;
  progress = 0.6;
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
        pullUps_pb: ['',[Validators.required]],
        encroach_pb: ['',[Validators.required]],
        goal_pb: ['',[Validators.required]],
        finalPosition_pb: ['',[Validators.required]],
        straightLineBaking_pb: ['',[Validators.required]],
        straightLineBakingInput_pb: ['',[Validators.required]],
        alleyDocking_pb: ['',[Validators.required]],
        alleyDockingInput_pb: ['',[Validators.required]],
        offSetBacking_pb: ['',[Validators.required]],
        offSetBackingInput_pb: ['',[Validators.required]],
        parallelParkingBlind_pb: ['',[Validators.required]],
        parallelParkingBlindInput_pb: ['',[Validators.required]],
        coupUncoup_pb: ['',[Validators.required]],
        coupUncoupInput_pb: ['',[Validators.required]],
        comments_pb:[''],
        category:['parking-blind']
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
      console.log(this.basicSkillForm.value);
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight');
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.toastService.presentToast(
              'Parking Blind details have been submitted',
              'success'
            );

            // navigating
         this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight');

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
