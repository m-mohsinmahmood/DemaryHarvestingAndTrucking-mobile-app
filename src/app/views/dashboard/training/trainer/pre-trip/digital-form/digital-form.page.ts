import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingService } from '../../../training.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-digital-form',
  templateUrl: './digital-form.page.html',
  styleUrls: ['./digital-form.page.scss'],
})
export class DigitalFormPage implements OnInit {
  preTripForm: FormGroup;
  value: any;
  buffer = 1;
  progress = 0;
  // selectAray: any[] = [
  //   'engine/compartment',
  //   'incab',
  //   'vehicle/external',
  //   'coupling',
  //   'suspension/brakes',
  // ];
  // indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  // text=0;
  // increment = 0;
  // increment1 = 0;

  constructor(private formBuilder: FormBuilder,
    private router:  Router,
    private trainingService: TrainingService,
    private toastService: ToastService) { }

  ngOnInit() {
     // passing the select value for Engine/Compartment to render when page loads
    this.value = 'engine/compartment';

    this.preTripForm = this.formBuilder.group({
      //Engine/Compartment
      oilLevel: [false,[Validators.required]],
      coolantLevelEngine: [false,[Validators.required]],
      powerSteelingLevel: [false,[Validators.required]],
      h20: [false,[Validators.required]],
      alternatorBelt: [false,[Validators.required]],
      airCompresseorEngine: [false,[Validators.required]],
      leaksHoses: [false,[Validators.required]],
      fanShroud: [false,[Validators.required]],
      radiator: [false,[Validators.required]],
      wiring: [false,[Validators.required]],
      steeringBox: [false,[Validators.required]],
      steeringLinkage: [false,[Validators.required]],
      hosesSteering: [false,[Validators.required]],
      turbo: [false,[Validators.required]],
      windowFluid: [false,[Validators.required]],
      mirror: [false,[Validators.required]],
      clutchCondition: [false,[Validators.required]],
      commentsEngine: ['',[Validators.required]],
      category:['engine-compartment']

    });
  }
  submit(){
    console.log(this.preTripForm.value);
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Engine/Compartment details have been submitted',
            'success'
          );

          // navigating
          this.router.navigateByUrl(
              '/tabs/home/training/trainer/pre-trip/digital-form/in-cab'
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
