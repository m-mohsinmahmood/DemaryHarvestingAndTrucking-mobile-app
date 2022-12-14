/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { AlertService } from 'src/app/alert/alert.service';
import { Alert } from 'src/app/alert/alert.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-start-job',
  templateUrl: './start-job.page.html',
  styleUrls: ['./start-job.page.scss'],
})
export class StartJobPage implements OnInit {
role: any;
startJobFormCombine: FormGroup;
startJobFormCrew: FormGroup;
startJobFormKart: FormGroup;
startJobFormTruck: FormGroup;
alertInfo: Alert = null;
showAlert = false;
private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private alertService: AlertService,
    private toastService: ToastService


  ) {
    this.alertService.showAlert({
      type: 'success',
      shake: false,
      slideRight: true,
      title: 'Success',
      message: 'hahahahahah',
      time: 5000,
  });
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
   this.initForms();

   //#region Alert Configuration
        // Subscribe to alert show/hide
        this.alertService.show_alert$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((show) => {
            this.showAlert = show;
        });

        // Subscribe to alert information
        this.alertService.alert_info$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((_alertInfo) => {
            this.alertInfo = _alertInfo;
        });
        //#endregion

  }

  ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

  goBack(){
    this.location.back();
  }

  initForms(){
    this.startJobFormCrew = this.formBuilder.group({
      machine_id: ['',[Validators.required]],
      separator_hours: ['',[Validators.required]],
      engine_hours: ['',[Validators.required]],
      confirm_field: ['',[Validators.required]],
    });
    this.startJobFormCombine = this.formBuilder.group({
      machine_id: ['',[Validators.required]],
      separator_hours: ['',[Validators.required]],
      engine_hours: ['',[Validators.required]],
      confirm_field: ['',[Validators.required]],
    });
    this.startJobFormKart = this.formBuilder.group({
      machine_id: ['',[Validators.required]],
      engine_hours: ['',[Validators.required]],
    });
    this.startJobFormTruck = this.formBuilder.group({
      truck_id: ['',[Validators.required]],
      crew_chief: ['',[Validators.required]],
      truck_company: ['',[Validators.required]],
      begining_odometer_miles: ['',[Validators.required]],
    });
  }
  submit(){
          console.log(this.startJobFormCrew.value);
          console.log(this.startJobFormCombine.value);
          console.log(this.startJobFormKart.value);
          console.log(this.startJobFormTruck.value);
          this.harvestingService.startJob(this.startJobFormCrew.value)
          .subscribe(
            (res: any) => {
                console.log('Response Start Job:',res);
                if(res.status === 200){
                  this.startJobFormCrew.reset();
                  this.toastService.presentToast(res.message,'success');
                }else{
                  console.log('Something happened :)');
                  this.toastService.presentToast(res.mssage,'danger');
                }
                //show notification based on message returned from the api
                // this.alertService.showAlert({
                //     type: 'success',
                //     shake: false,
                //     slideRight: true,
                //     title: 'Success',
                //     message: res.message,
                //     time: 5000,
                // });
              },
            (err) => {
              this.toastService.presentToast(err,'danger');
              console.log('Error:',err);
            },
        );
  }
}
