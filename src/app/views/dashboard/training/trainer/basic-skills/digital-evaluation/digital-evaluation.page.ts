/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../training.service';

@Component({
  selector: 'app-digital-evaluation',
  templateUrl: './digital-evaluation.page.html',
  styleUrls: ['./digital-evaluation.page.scss'],
})
export class DigitalEvaluationPage implements OnInit {
  basicSkillForm: FormGroup;
  value;
  buffer = 1;
  progress = 0;
  // selectAray: any[] = [
  //   'straight-line',
  //   'alley-docking',
  //   'offset',
  //   'parking-blind',
  //   'parking-sight',
  //   'coup-uncoup'
  // ];
  // indexArray: any[] = [0.1666666666666667, 0.3333333333333334, 0.5000000000000001, 0.6666666666666668, 0.8333333333333335,1];
  // indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  text=0;
  feedbackValue: any;

  // increment = 0;
  // increment1 = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService
    ) { }

  ngOnInit() {
    this.basicSkillForm = this.formBuilder.group({
      pullUpsInput_slb: ['',[Validators.required]],
      encroachInput_slb: ['',[Validators.required]],
      goal_slb: ['',[Validators.required]],
      finalPosition_slb: ['',[Validators.required]],
      straightLineBacking_slb: ['',[Validators.required]],
      straightLineBakingInput_slb: ['',[Validators.required]], //<-
      alleyDocking_slb: ['',[Validators.required]],
      alleyDockingInput_slb: ['',[Validators.required]],
      offSetBacking_slb: ['',[Validators.required]],
      offSetBackingInput_slb: ['',[Validators.required]],
      parallelParkingBlind_slb: ['',[Validators.required]],
      parallelParkingBlindInput_slb: ['',[Validators.required]],
      coupUncoup_slb: ['',[Validators.required]],
      coupUncoupInput_slb: ['',[Validators.required]],
      comments_slb: [''],
      category:['straight-line-backing']
    });
  }
  navigate() {
    console.log(this.basicSkillForm.value);
    // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking');

    this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Straight Line Backing details have been submitted',
            'success'
          );

          // navigating
         this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking');

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
  addFeedback(){
    this.feedbackValue = true;
  }
  submit(){
    console.log(this.basicSkillForm.value);
  }
}
