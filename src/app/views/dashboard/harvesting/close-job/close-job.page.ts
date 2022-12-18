/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-close-job',
  templateUrl: './close-job.page.html',
  styleUrls: ['./close-job.page.scss'],
})
export class CloseJobPage implements OnInit {
role: any;
closeJobFormCrew: FormGroup;
closeJobFormCombine: FormGroup;
closeJobFormKart: FormGroup;
closeJobFormTruck: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService


  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.closeJobFormCrew = this.formBuilder.group({
      separator_hours: ['',[Validators.required]],
      engine_hours: ['',[Validators.required]],
    });
    this.closeJobFormCombine = this.formBuilder.group({
      ending_separator_hours: ['',[Validators.required]],
      ending_engine_hours: ['',[Validators.required]],
    });

    this.closeJobFormKart = this.formBuilder.group({
      engine_hours: ['',[Validators.required]],
    });
    this.closeJobFormTruck = this.formBuilder.group({
      ending_odometer_miles: ['',[Validators.required]],
    });
  }
  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.closeJobFormCrew.value);
    this.harvestingService.closeJob(this.closeJobFormCrew.value)
    .subscribe(
      (res: any) => {
          console.log('Response Start Job:',res);
          if(res.status === 200){
            this.closeJobFormCrew.reset();
            this.toastService.presentToast(res.message,'success');
          }else{
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage,'danger');
          }
        },
      (err) => {
        this.toastService.presentToast(err,'danger');
        console.log('Error:',err);
      },
  );
    console.log(this.closeJobFormKart.value);
    console.log(this.closeJobFormTruck.value);
    console.log(this.closeJobFormCombine.value);

  }
}
