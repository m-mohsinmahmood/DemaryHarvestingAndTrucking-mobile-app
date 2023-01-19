/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-coup-uncoup',
  templateUrl: './coup-uncoup.page.html',
  styleUrls: ['./coup-uncoup.page.scss'],
})
export class CoupUncoupPage implements OnInit {

  buffer = 1;
  progress = 1;
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
        pullUps_cou: ['',[Validators.required]],
        encroach_cou: ['',[Validators.required]],
        goal_cou: ['',[Validators.required]],
        finalPosition_cou: ['',[Validators.required]],
        straightLineBacking_cou: ['',[Validators.required]],
        straightLineBackingInput_cou: ['',[Validators.required]],
        alleyDocking_cou: ['',[Validators.required]],
        alleyDockingInput_cou: ['',[Validators.required]],
        offSetBacking_cou: ['',[Validators.required]],
        offSetBackingInput_cou: ['',[Validators.required]],
        parallelParkingBlind_cou: ['',[Validators.required]],
        parallelParkingBlindInput_cou: ['',[Validators.required]],
        coupUncoup_cou: ['',[Validators.required]],
        coupUncoupInput_cou: ['',[Validators.required]],
        comments_cou:[''],
        category:['coup-uncoup']

      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
      console.log(this.basicSkillForm.value);
      // eslint-disable-next-line max-len
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight');
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.toastService.presentToast(
              'Digital Evaluation completed',
              'success'
            );

            // navigating
            this.router.navigateByUrl('/tabs/home/training/trainer');

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
