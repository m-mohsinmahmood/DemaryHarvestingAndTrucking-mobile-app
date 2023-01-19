import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-vehicle-external',
  templateUrl: './vehicle-external.page.html',
  styleUrls: ['./vehicle-external.page.scss'],
})
export class VehicleExternalPage implements OnInit {
  preTripForm: FormGroup;
  buffer = 1;
  progress = 0.4;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.preTripForm = this.formBuilder.group({
      lightFunctionVehicle: [false,[Validators.required]],
      lensReflector: [false,[Validators.required]],
      door: [false,[Validators.required]],
      fuelTank: [false,[Validators.required]],
      leaks: [false,[Validators.required]],
      steps: [false,[Validators.required]],
      frame: [false,[Validators.required]],
      driveShaft: [false,[Validators.required]],
      tires: [false,[Validators.required]],
      rims: [false,[Validators.required]],
      lugNuts: [false,[Validators.required]],
      axelHubSeal: [false,[Validators.required]],
      bidSpacers: [false,[Validators.required]],
      batteryBox: [false,[Validators.required]],
      exhaust: [false,[Validators.required]],
      headerBvd: [false,[Validators.required]],
      landingGear: [false,[Validators.required]],
      commentsVehicle: ['',[Validators.required]],
      category:['vehicle-external']
    });
  }
  submit(){
    console.log(this.preTripForm.value);
    // this.router.navigateByUrl(
    //   '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling'
    // );
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Vehicle/External details have been submitted',
            'success'
          );

          // navigating
          this.router.navigateByUrl(
              '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling'
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
