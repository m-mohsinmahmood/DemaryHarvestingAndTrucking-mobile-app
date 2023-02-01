/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      category:['suspension-brakes'],
      percentageSuspension:[],
      trainer_id:[this.trainer_id],
      endDate:[Date.now()]
    });
    this.preTripForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      if(value.springs){
        sum = 1 + sum;
      }
      if(value.airBags){
        sum = 1 + sum;
      }
      if(value.shocks){
        sum = 1 + sum;
      }
      if(value.vBolts){
        sum = 1 + sum;
      }
      if(value.mounts){
        sum = 1 + sum;
      }
      if(value.bushings){
        sum = 1 + sum;
      }
      if(value.leafSprings){
        sum = 1 + sum;
      }
      if(value.slackAdjusters){
        sum = 1 + sum;
      }
      if(value.crackChammber){
        sum = 1 + sum;
      }
      if(value.pushRod){
        sum = 1 + sum;
      }
      if(value.drums){
        sum = 1 + sum;
      }
      if(value.linings){
        sum = 1 + sum;
      }
      if(value.rotor){
        sum = 1 + sum;
      }
      if(value.discPads){
        sum = 1 + sum;
      }
      if(value.brakeHoses){
        sum = 1 + sum;
      }
      if(value.cams){
        sum = 1 + sum;
      }
      if(value.torqueArm){
        sum = 1 + sum;
      }
      if(value.wheelSeals){
        sum = 1 + sum;
      }
      console.log('Sum:',sum);
      this.result = Math.round((sum / 18) * 100);

    });
    this.route.queryParams.subscribe((params)=>{
      this.training_record_id = params.training_record_id;
    });
  }
  exit(){
     //patching value
     this.preTripForm.patchValue({
      percentageSuspension: this.result
    });

    console.log(this.preTripForm.value);
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {

           // creating DWR
           this.createDWR();

          this.toastService.presentToast(
            'Digital evaluation completed',
            'success'
          );

          // navigating
        // this.router.navigate(['/tabs/home/training/trainer']);
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

  createDWR(){
    this.trainingService
     .createDWR(localStorage.getItem('employeeId'), this.training_record_id,'pre-trip','digital-form','4543344b-0b74-49a2-b3c7-d388851f0013')
     .subscribe(
       (res) => {
         console.log('RES:', res);
         if (res.status === 200) {
           this.router.navigateByUrl('/tabs/home/training/trainer');
           // this.toastService.presentToast(
           //   'Ticket has been completed',
           //   'success'
           // );
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
