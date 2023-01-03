/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
// import * as moment from 'moment';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-close-out',
  templateUrl: './close-out.page.html',
  styleUrls: ['./close-out.page.scss'],
})
export class CloseOutPage implements OnInit {
  closeJobFormCrew: FormGroup;
  closeJobFormCombine: FormGroup;
  closeJobFormKart: FormGroup;
  date: any = moment(new Date()).format('DD-MM-YYYY');
  customerData: any;
  isLoading: any;
  role: any;
  constructor(
    private formBuilder: FormBuilder,
    private harvestingservice: HarvestingService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    // getting role
    this.role = localStorage.getItem('role');

    this.initForms();
    this.initApis();
    this.initObservables();
  }
  initForms(){
    this.closeJobFormCrew = this.formBuilder.group({
      customer_id: [],
      employee_id: ['4cdcc5f3-e35e-40c8-a3fd-6b0fa2414fe8'],
      is_close_crew: [true],
      total_acres: ['',[Validators.required]],
      total_gps_acres: ['',[Validators.required]],
    });
    this.closeJobFormCombine = this.formBuilder.group({
      customer_id: [],
      employee_id: ['4b843edb-0b74-49a2-b3c7-d3884f5f6012'],
      is_close_combine: [true],
      total_acres: ['',[Validators.required]],
      total_gps_acres: ['',[Validators.required]],
    });
    this.closeJobFormKart = this.formBuilder.group({
      customer_id: [],
      employee_id: ['2bf46542-d0bb-4ada-96e6-c103853c3f0d'],
      is_close_kart: [true],
      total_acres: ['',[Validators.required]],
      total_gps_acres: ['',[Validators.required]],
    });
  }
  initApis(){
    if(this.role === 'crew-chief'){
      this.harvestingservice.getJobTesting('crew-chief');
    }else if(this.role === 'combine-operator'){
      this.harvestingservice.getJobTesting('combine-operator');
    }else if(this.role === 'kart-operator'){
      this.harvestingservice.getJobTesting('kart-operator');
    }else if(this.role === 'truck-driver'){
      this.harvestingservice.getJobTesting('truck-driver');
    }

  }
  initObservables(){
    this.harvestingservice.customer$.subscribe((res)=>{
      console.log(res);
      this.customerData = res;
      // For crew-chief
      if(this.role === 'crew-chief'){
        this.closeJobFormCrew.patchValue({
          customer_id: this.customerData?.customer_job[0].customer_id
        });
      }
      // For combine operator
      else if(this.role === 'combine-operator'){
        this.closeJobFormCombine.patchValue({
          customer_id: this.customerData?.customer_job[0].customer_id
        });
      }
      // For kart operator
      else if(this.role === 'kart-operator'){
        this.closeJobFormKart.patchValue({
          customer_id: this.customerData?.customer_job[0].customer_id
        });
      }

    });
    this.harvestingservice.customerLoading$.subscribe((val)=>{
      console.log('value',val);
      this.isLoading = val;
    });
  }
  submit(){
    console.log(this.closeJobFormCrew.value);
    console.log(this.closeJobFormCombine.value);
    console.log(this.closeJobFormKart.value);

    if(this.role === 'crew-chief'){
      this.harvestingservice.closeOutJob(this.closeJobFormCrew.value).subscribe(
        (res: any) => {
            console.log('Response of Close-Out Job:',res);
            if(res.status === 200){
              this.closeJobFormCrew.reset();
              this.toastService.presentToast(res.message,'success');
            } else{
              console.log('Something happened :)');
            }
        },
        (err) => {
          console.log('Error in Close-Out Job:',err);
        },
    );
    }else if(this.role === 'combine-operator'){
      this.harvestingservice.closeOutJob(this.closeJobFormCombine.value).subscribe(
        (res: any) => {
            console.log('Response of Close-Out Job:',res);
            if(res.status === 200){
              this.closeJobFormCrew.reset();
              this.toastService.presentToast(res.message,'success');
            } else{
              console.log('Something happened :)');
            }
        },
        (err) => {
          console.log('Error in Close-Out Job:',err.message);
        },
    );
    }else if(this.role === 'kart-operator'){
      this.harvestingservice.closeOutJob(this.closeJobFormKart.value).subscribe(
        (res: any) => {
            console.log('Response of Close-Out Job:',res);
            if(res.status === 200){
              this.closeJobFormCrew.reset();
              this.toastService.presentToast(res.message,'success');
            } else{
              console.log('Something happened :)');
            }
        },
        (err) => {
          console.log('Error in Close-Out Job:',err.message);
        },
    );
    }
  }
}
