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
dataDWR: any;


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
    // if(this.role === 'crew-chief'){
    //   this.harvestingService.getJobTesting('crew-chief');
    // }else if(this.role === 'combine-operator'){
    //   this.harvestingService.getJobTesting('combine-operator');
    // }else if(this.role === 'kart-operator'){
    //   this.harvestingService.getJobTesting('kart-operator');
    // }else if(this.role === 'truck-driver'){
    //   this.harvestingService.getJobTesting('truck-driver');
    // }
    if(this.role === 'crew-chief'){
      this.harvestingService.getJobTesting2('crew-chief','8920a566-003c-47f0-82dc-21e74196bb98');
      // this.harvestingService.getDWR('8920a566-003c-47f0-82dc-21e74196bb98','beginningOfDay')
      // .subscribe((res)=>{
      //   console.log('RESS:',res);
      //   this.dataDWR = res;

      // });
    }
     if(this.role === 'combine-operator'){
      this.harvestingService.getJobTesting2('combine-operator','3ac2db42-d0c1-4493-a0cf-b19deb834f46');
    }
    // else if(this.role === 'kart-operator'){
    //   this.harvestingService.getJobTesting2('kart-operator','f4cfa75b-7c14-4b68-a192-00d56c9f2022');
    // }else if(this.role === 'truck-driver'){
    //   this.harvestingService.getJobTesting2('truck-driver','edbce4de-bee6-40f9-b720-9ccf230bb3af');
    // }
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
      employeeId: ['8920a566-003c-47f0-82dc-21e74196bb98'],
    });
    this.closeJobFormCombine = this.formBuilder.group({

      ending_separator_hours: ['',[Validators.required]],
      endingEngineHours: ['',[Validators.required]],
      employeeId: ['3ac2db42-d0c1-4493-a0cf-b19deb834f46'],
    });

    this.closeJobFormKart = this.formBuilder.group({
      endingEngineHours: ['',[Validators.required]],
      employeeId: ['f4cfa75b-7c14-4b68-a192-00d56c9f2022'],

    });
    this.closeJobFormTruck = this.formBuilder.group({
      ending_odometer_miles: ['',[Validators.required]],
      employeeId: ['edbce4de-bee6-40f9-b720-9ccf230bb3af'],
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
