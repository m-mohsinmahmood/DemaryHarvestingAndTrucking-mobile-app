/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Observable } from 'rxjs';

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

customerData: any;
isLoadingCustomer$:  Observable<any>;


  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService


  ) { }

  ngOnInit() {
    // getting role
    this.role = localStorage.getItem('role');

    this.initForms();
    this.initApis();
    this.initObservables();
  }
  initApis() {
    if(this.role === 'crew-chief'){
      this.harvestingService.getJobTesting('crew-chief');
    }else if(this.role === 'combine-operator'){
      this.harvestingService.getJobTesting('combine-operator');
    }else if(this.role === 'kart-operator'){
      this.harvestingService.getJobTesting('kart-operator');
    }else if(this.role === 'truck-driver'){
      this.harvestingService.getJobTesting('truck-driver');
    }
  }
  initObservables() {
    this.harvestingService.customer$.subscribe((res) => {
      if(res){
        this.customerData = res;
      }
    });

    //Loader
    this.isLoadingCustomer$ = this.harvestingService.customerLoading$;
  }
  goBack(){
    this.location.back();
  }
  initForms(){
    this.closeJobFormCrew = this.formBuilder.group({
      ending_separator_hours: ['',[Validators.required]],
      endingEngineHours: ['',[Validators.required]],
      employeeId: ['5aec5490-57fe-4688-9ac3-b3e6e13bafb5'],
    });
    this.closeJobFormCombine = this.formBuilder.group({

      ending_separator_hours: ['',[Validators.required]],
      endingEngineHours: ['',[Validators.required]],
      employeeId: ['e4d3e774-fade-4603-93ba-c03ef6f6c150'],
    });

    this.closeJobFormKart = this.formBuilder.group({
      endingEngineHours: ['',[Validators.required]],
      employeeId: ['daea0b53-f5f5-4d0e-ac6b-1175542f74b0'],

    });
    this.closeJobFormTruck = this.formBuilder.group({
      ending_odometer_miles: ['',[Validators.required]],
      employeeId: ['2bf46542-d0bb-4ada-96e6-c103853c3f0d'],
    });
  }
  submit(){
    console.log(this.closeJobFormCrew.value);
    console.log(this.closeJobFormKart.value);
    console.log(this.closeJobFormTruck.value);
    console.log(this.closeJobFormCombine.value);

        if(localStorage.getItem('role') === 'crew-chief'){
          this.harvestingService.closeBeginningDay(this.closeJobFormCrew.value)
            .subscribe(
              (res: any) => {
                console.log(res);
                if (res.status === 200) {
                  this.toastService.presentToast('Day has been closed successfully!', 'success');
                  // this.router.navigateByUrl('/tabs/home/farming');
                }
              },
              (err) => {
                this.toastService.presentToast(err, 'danger');
              },
            );
        }
        if(localStorage.getItem('role') === 'combine-operator'){
          this.harvestingService.closeBeginningDay(this.closeJobFormCombine.value)
            .subscribe(
              (res: any) => {
                console.log(res);
                if (res.status === 200) {
                  this.toastService.presentToast('Day has been closed successfully!', 'success');
                  // this.router.navigateByUrl('/tabs/home/farming');
                }
              },
              (err) => {
                this.toastService.presentToast(err.message, 'danger');
              },
            );
        }
        if(localStorage.getItem('role') === 'kart-operator'){
          this.harvestingService.closeBeginningDay(this.closeJobFormKart.value)
            .subscribe(
              (res: any) => {
                console.log(res);
                if (res.status === 200) {
                  this.toastService.presentToast('Day has been closed successfully!', 'success');
                  // this.router.navigateByUrl('/tabs/home/farming');
                }
              },
              (err) => {
                this.toastService.presentToast(err, 'danger');
              },
            );
        }
        if(localStorage.getItem('role') === 'truck-driver'){
          this.harvestingService.closeBeginningDay(this.closeJobFormTruck.value)
            .subscribe(
              (res: any) => {
                console.log(res);
                if (res.status === 200) {
                  this.toastService.presentToast('Day has been closed successfully!', 'success');
                  // this.router.navigateByUrl('/tabs/home/farming');
                }
              },
              (err) => {
                this.toastService.presentToast(err, 'danger');
              },
            );
        }

  }
}
