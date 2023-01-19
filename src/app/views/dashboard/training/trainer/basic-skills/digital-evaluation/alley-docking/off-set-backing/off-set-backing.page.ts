/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-off-set-backing',
  templateUrl: './off-set-backing.page.html',
  styleUrls: ['./off-set-backing.page.scss'],
})
export class OffSetBackingPage implements OnInit {

  buffer = 1;
  progress = 0.4;
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
        pullUps_osb: ['',[Validators.required]],
        encroach_osb: ['',[Validators.required]],
        goal_osb: ['',[Validators.required]],
        finalPosition_osb: ['',[Validators.required]],
        straightLineBaking_osb: ['',[Validators.required]],
        straightLineBakingInput_osb: ['',[Validators.required]],
        alleyDocking_osb: ['',[Validators.required]],
        alleyDockingInput_osb: ['',[Validators.required]],
        offSetBacking_osb: ['',[Validators.required]],
        offSetBackingInput_osb: ['',[Validators.required]],
        parallelParkingBlind_osb: ['',[Validators.required]],
        parallelParkingBlindInput_osb: ['',[Validators.required]],
        coupUncoup_osb: ['',[Validators.required]],
        coupUncoupInput_osb: ['',[Validators.required]],
        comments_osb:[''],
        category:['off-set-backing']
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
      console.log(this.basicSkillForm.value);
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind');
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.toastService.presentToast(
              'Off-set backing details have been submitted',
              'success'
            );

            // navigating
           this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind');

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
