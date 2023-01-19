import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../../training.service';

@Component({
  selector: 'app-in-cab',
  templateUrl: './in-cab.page.html',
  styleUrls: ['./in-cab.page.scss'],
})
export class InCabPage implements OnInit {
  preTripForm: FormGroup;
  buffer = 1;
  progress = 0.2;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService
    ) {}

  ngOnInit() {
    this.preTripForm = this.formBuilder.group({
      // preSelect: ['',[Validators.required]],

      // In Cab
      safetyBelt: [false, [Validators.required]],
      coolantLevelCab: [false, [Validators.required]],
      emergencyEquipment: [false, [Validators.required]],
      safeStart: [false, [Validators.required]],
      temperatureGauge: [false, [Validators.required]],
      oilPressure: [false, [Validators.required]],
      voltMeter: [false, [Validators.required]],
      airGaugeBuCo: [false, [Validators.required]],
      indicators: [false, [Validators.required]],
      horns: [false, [Validators.required]],
      defroster: [false, [Validators.required]],
      windshield: [false, [Validators.required]],
      wipersWash: [false, [Validators.required]],
      parkBrake: [false, [Validators.required]],
      svcBrake: [false, [Validators.required]],
      leakTest: [false, [Validators.required]],
      abcLights: [false, [Validators.required]],
      lightFunction: [false, [Validators.required]],
      commentsCab: ['', [Validators.required]],
      category:['in-cab']

    });
  }
  submit(){
    console.log(this.preTripForm.value);
    // this.router.navigateByUrl(
    //   '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external'
    // );
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'In-cab details have been submitted',
            'success'
          );

          // navigating
          this.router.navigateByUrl(
              '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external'
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
