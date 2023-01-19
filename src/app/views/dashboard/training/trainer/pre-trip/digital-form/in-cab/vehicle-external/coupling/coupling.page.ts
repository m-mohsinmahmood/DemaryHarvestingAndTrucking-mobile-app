import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-coupling',
  templateUrl: './coupling.page.html',
  styleUrls: ['./coupling.page.scss'],
})
export class CouplingPage implements OnInit {
  preTripForm: FormGroup;
  buffer = 1;
  progress = 0.6;
  constructor(private formBuilder: FormBuilder,
    private router:  Router,
    private trainingService: TrainingService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.preTripForm = this.formBuilder.group({
         //Coupling
         airConditioners: [false,[Validators.required]],
         electricConnectors: [false,[Validators.required]],
         mountingBolts: [false,[Validators.required]],
         platformBase: [false,[Validators.required]],
         lockingJaws: [false,[Validators.required]],
         grease: [false,[Validators.required]],
         releaseArm: [false,[Validators.required]],
         skidPlate: [false,[Validators.required]],
         slidingPins: [false,[Validators.required]],
         kingPin: [false,[Validators.required]],
         apron: [false,[Validators.required]],
         gap: [false,[Validators.required]],
         airLine: [false,[Validators.required]],
         location: [false,[Validators.required]],
         safetyDevices: [false,[Validators.required]],
         print: [false,[Validators.required]],
         drawBar: [false,[Validators.required]],
         commentsCoupling: ['',[Validators.required]],
         category:['coupling']
    });
  }
  submit(){
    console.log(this.preTripForm.value);
    // this.router.navigateByUrl(
    //   '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling/suspension-brakes'
    // );
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Coupling details have been submitted',
            'success'
          );

          // navigating
          this.router.navigateByUrl(
              '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling/suspension-brakes'
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
