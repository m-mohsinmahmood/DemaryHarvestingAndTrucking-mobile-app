import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-suspension-brakes',
  templateUrl: './suspension-brakes.page.html',
  styleUrls: ['./suspension-brakes.page.scss'],
})
export class SuspensionBrakesPage implements OnInit {

  preTripForm: FormGroup;
  buffer = 1;
  progress = 0.8;
  constructor(private formBuilder: FormBuilder,
    private router:  Router,
    private trainingService: TrainingService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.preTripForm = this.formBuilder.group({
       //Suspension/Brakes
      springs: [false,[Validators.required]],
      airBags: [false,[Validators.required]],
      shocks: [false,[Validators.required]],
      vBolts: [false,[Validators.required]],
      mounts: [false,[Validators.required]],
      bushings: [false,[Validators.required]],
      leafSprings: [false,[Validators.required]],
      slackAdjusters: [false,[Validators.required]],
      crackChammber: [false,[Validators.required]],
      pushRod: [false,[Validators.required]],
      drums: [false,[Validators.required]],
      linings: [false,[Validators.required]],
      rotor: [false,[Validators.required]],
      discPads: [false,[Validators.required]],
      brakeHoses: [false,[Validators.required]],
      cams: [false,[Validators.required]],
      torqueArm: [false,[Validators.required]],
      wheelSeals: [false,[Validators.required]],
      commentsSuspension: ['',[Validators.required]],
      category:['suspension-brakes']
    });
  }
  exit(){
    console.log(this.preTripForm.value);
    // this.router.navigateByUrl(
    //   '/tabs/home/training/trainer/pre-trip/digital-form/in-cab'
    // );
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Digital valuation completed',
            'success'
          );

          // navigating
          this.router.navigateByUrl(
              '/tabs/home/training/trainer/pre-trip'
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

}
