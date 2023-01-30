/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      category:['vehicle-external'],
      percentageVehicleExternal:[],
      trainer_id:[this.trainer_id]
    });
    this.preTripForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      if(value.lightFunctionVehicle){
        sum = 1 + sum;
      }
       if (value.lensReflector){
        sum = 1 + sum;
      }
      if (value.door){
        sum = 1 + sum;
      }
       if (value.fuelTank){
        sum = 1 + sum;
      }
      if (value.leaks){
        sum = 1 + sum;
      }
      if (value.steps){
        sum = 1 + sum;
      }
      if (value.frame){
        sum = 1 + sum;
      }
      if (value.driveShaft){
        sum = 1 + sum;
      }
      if (value.tires){
        sum = 1 + sum;
      }
      if (value.rims){
        sum = 1 + sum;
      }
      if (value.lugNuts){
        sum = 1 + sum;
      }
      if (value.axelHubSeal){
        sum = 1 + sum;
      }
      if (value.bidSpacers){
        sum = 1 + sum;
      }
      if (value.batteryBox){
        sum = 1 + sum;
      }
      if (value.exhaust){
        sum = 1 + sum;
      }
      if (value.headerBvd){
        sum = 1 + sum;
      }
      if (value.landingGear){
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
      percentageVehicleExternal: this.result
    });
    console.log(this.preTripForm.value);

    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Vehicle/External details have been submitted',
            'success'
          );

          // navigating
        this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling'],{
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
