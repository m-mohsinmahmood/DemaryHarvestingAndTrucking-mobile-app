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
  initForms() {
    this.closeJobFormCrew = this.formBuilder.group({
      customer_id: [],
      crew_chief_id: [localStorage.getItem('employeeId')],
      is_close_crew: [true],
      total_acres: ['', [Validators.required]],
      total_gps_acres: ['', [Validators.required]],
      state: [''],
      farm_id: [''],
      crop_id: [''],
      field_id: ['']
    });
    this.closeJobFormCombine = this.formBuilder.group({
      customer_id: [],
      employee_id: ['4b843edb-0b74-49a2-b3c7-d3884f5f6012'],
      is_close_combine: [true],
      total_acres: ['', [Validators.required]],
      total_gps_acres: ['', [Validators.required]],
    });
    this.closeJobFormKart = this.formBuilder.group({
      customer_id: [],
      employee_id: ['2bf46542-d0bb-4ada-96e6-c103853c3f0d'],
      is_close_kart: [true],
      total_acres: ['', [Validators.required]],
      total_gps_acres: ['', [Validators.required]],
    });
  }
  initApis() {
    // if(this.role === 'crew-chief'){
    //   this.harvestingservice.getJobTesting('crew-chief');
    // }else if(this.role === 'combine-operator'){
    //   this.harvestingservice.getJobTesting('combine-operator');
    // }else if(this.role === 'kart-operator'){
    //   this.harvestingservice.getJobTesting('kart-operator');
    // }else if(this.role === 'truck-driver'){
    //   this.harvestingservice.getJobTesting('truck-driver');
    // }
    if (this.role === 'crew-chief') {
      console.log(localStorage.getItem('employeeId'));

      this.harvestingservice.getJobSetup('crew-chief', localStorage.getItem('employeeId'));
    }
    // else if(this.role === 'combine-operator'){
    //   this.harvestingservice.getJobTesting2('combine-operator','3ac2db42-d0c1-4493-a0cf-b19deb834f46');
    // }else if(this.role === 'kart-operator'){
    //   this.harvestingservice.getJobTesting2('kart-operator','f4cfa75b-7c14-4b68-a192-00d56c9f2022');
    // }else if(this.role === 'truck-driver'){
    //   this.harvestingservice.getJobTesting2('truck-driver','edbce4de-bee6-40f9-b720-9ccf230bb3af');
    // }

  }
  initObservables() {
    this.harvestingservice.customer$.subscribe((res) => {
      console.log(res);
      this.customerData = res;
      // For crew-chief
      if (this.role === 'crew-chief') {
        this.closeJobFormCrew.patchValue({
          customer_id: this.customerData?.customer_job[0].customer_id,
          state: this.customerData?.customer_job[0].state,
          farm_id: this.customerData?.customer_job[0].farm_id,
          crop_id: this.customerData?.customer_job[0].crop_id,
          field_id: this.customerData?.customer_job[0].field_id
        });
      }
      // For combine operator
      else if (this.role === 'combine-operator') {
        this.closeJobFormCombine.patchValue({
          customer_id: this.customerData?.customer_job[0].customer_id
        });
      }
      // For kart operator
      else if (this.role === 'kart-operator') {
        this.closeJobFormKart.patchValue({
          customer_id: this.customerData?.customer_job[0].customer_id
        });
      }

    });
    this.harvestingservice.customerLoading$.subscribe((val) => {
      console.log('value', val);
      this.isLoading = val;
    });
  }
  submit() {
    // console.log(this.closeJobFormCombine.value);
    // console.log(this.closeJobFormKart.value);

    this.closeJobFormCrew.value.changeFarmFieldCrop = true;
    this.closeJobFormCrew.value.closeJob = true;

    console.log(this.closeJobFormCrew.value);

    if (this.role === 'crew-chief') {
      this.harvestingservice.createJob(this.closeJobFormCrew.value).subscribe(
        (res: any) => {
          console.log('Response of Close-Out Job:', res);
          if (res.status === 200) {
            this.closeJobFormCrew.reset();
            this.toastService.presentToast(res.message, 'success');
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error in Close-Out Job:', err);
        },
      );
    } else if (this.role === 'combine-operator') {
      this.harvestingservice.closeOutJob(this.closeJobFormCombine.value).subscribe(
        (res: any) => {
          console.log('Response of Close-Out Job:', res);
          if (res.status === 200) {
            this.closeJobFormCrew.reset();
            this.toastService.presentToast(res.message, 'success');
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error in Close-Out Job:', err.message);
        },
      );
    } else if (this.role === 'kart-operator') {
      this.harvestingservice.closeOutJob(this.closeJobFormKart.value).subscribe(
        (res: any) => {
          console.log('Response of Close-Out Job:', res);
          if (res.status === 200) {
            this.closeJobFormCrew.reset();
            this.toastService.presentToast(res.message, 'success');
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error in Close-Out Job:', err.message);
        },
      );
    }
  }
}
