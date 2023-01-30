/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  result: any = 0;
  training_record_id: any;

    // trainer id
    trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';

  constructor(private formBuilder: FormBuilder,
    private router:  Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    ) { }

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
         category:['coupling'],
         percentageCoupling:[],
      trainer_id:[this.trainer_id]

    });
    this.preTripForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      if(value.airConditioners){
        sum = 1 + sum;
      }
      if(value.electricConnectors){
        sum = 1 + sum;
      }
      if(value.mountingBolts){
        sum = 1 + sum;
      }
      if(value.platformBase){
        sum = 1 + sum;
      }
      if(value.lockingJaws){
        sum = 1 + sum;
      }
      if(value.grease){
        sum = 1 + sum;
      }
      if(value.releaseArm){
        sum = 1 + sum;
      }
      if(value.skidPlate){
        sum = 1 + sum;
      }
      if(value.slidingPins){
        sum = 1 + sum;
      }
      if(value.kingPin){
        sum = 1 + sum;
      }
       if(value.apron){
        sum = 1 + sum;
      }
       if(value.gap){
        sum = 1 + sum;
      }
      if(value.airLine){
        sum = 1 + sum;
      }
      if(value.location){
        sum = 1 + sum;
      }
      if(value.safetyDevices){
        sum = 1 + sum;
      }
      if(value.print){
        sum = 1 + sum;
      }
      if(value.drawBar){
        sum = 1 + sum;
      }
      console.log('Sum:',sum);
      this.result = Math.round((sum / 17) * 100);
    });
    this.route.queryParams.subscribe((params)=>{
      this.training_record_id = params.training_record_id;
    });
  }
  submit(){
    //patching value
    this.preTripForm.patchValue({
      percentageCoupling: this.result
    });
    console.log(this.preTripForm.value);
   ;
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Coupling details have been submitted',
            'success'
          );

          // navigating
        this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling/suspension-brakes'],{
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
