/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  result: any = 0;
  training_record_id: any;

  // trainer id
 trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute,

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
      category:['in-cab'],
      percentageInCab:[],
      trainer_id:[this.trainer_id]

    });
    this.preTripForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      if(value.safetyBelt){
        sum = 1 + sum;
      }
       if (value.coolantLevelCab){
        sum = 1 + sum;
      }
      if (value.emergencyEquipment){
        sum = 1 + sum;
      }
      if (value.safeStart){
        sum = 1 + sum;
      }
      if (value.temperatureGauge){
        sum = 1 + sum;
      }
      if (value.oilPressure){
        sum = 1 + sum;
      }
      if (value.voltMeter){
        sum = 1 + sum;
      }
      if (value.airGaugeBuCo){
        sum = 1 + sum;
      }
      if (value.indicators){
        sum = 1 + sum;
      }
      if (value.horns){
        sum = 1 + sum;
      }
      if (value.defroster){
        sum = 1 + sum;
      }
      if (value.windshield){
        sum = 1 + sum;
      }
      if (value.wipersWash){
        sum = 1 + sum;
      }
      if (value.parkBrake){
        sum = 1 + sum;
      }
      if (value.svcBrake){
        sum = 1 + sum;
      }
      if (value.leakTest){
        sum = 1 + sum;
      }
      if (value.abcLights){
        sum = 1 + sum;
      }
      if (value.lightFunction){
        sum = 1 + sum;
      }
      this.result = Math.round((sum / 18) * 100);
    });

    this.route.queryParams.subscribe((params)=>{
      this.training_record_id = params.training_record_id;
    });
  }
  submit(){
      //patching value
      this.preTripForm.patchValue({
        percentageInCab: this.result
      });

    console.log(this.preTripForm.value);

    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'In-cab details have been submitted',
            'success'
          );

          // navigating
        this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external'],{
          queryParams:{
            training_record_id: this.training_record_id
          }
        });
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
