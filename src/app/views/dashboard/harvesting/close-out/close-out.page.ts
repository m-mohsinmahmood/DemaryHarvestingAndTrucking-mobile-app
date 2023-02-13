/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
// import * as moment from 'moment';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Subject } from 'rxjs';

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
  sub;
  loadingSub;

  constructor(
    private formBuilder: FormBuilder,
    private harvestingservice: HarvestingService,
    private toastService: ToastService
  ) { }
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit() {
    // getting role
    this.role = localStorage.getItem('role');

    this.initForms();
    this.initApis();
    this.initObservables();
  }

  DataDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.sub.unsubscribe();
    this.loadingSub.unsubscribe();
  }

  initForms() {
    this.closeJobFormCrew = this.formBuilder.group({
      customer_id: [],
      crew_chief_id: localStorage.getItem('employeeId'),
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
      employee_id: localStorage.getItem('employeeId'),
      is_close_combine: [true],
      total_acres: ['', [Validators.required]],
      total_gps_acres: ['', [Validators.required]],
    });
    this.closeJobFormKart = this.formBuilder.group({
      customer_id: [],
      employee_id: localStorage.getItem('employeeId'),
      is_close_kart: [true],
      total_acres: ['', [Validators.required]],
      total_gps_acres: ['', [Validators.required]],
    });
  }
  initApis() {

    if (this.role === 'crew-chief') {
      console.log(localStorage.getItem('employeeId'));

      this.harvestingservice.getJobSetup('crew-chief', localStorage.getItem('employeeId'));
    }
  }
  initObservables() {
    this.sub = this.harvestingservice.customerJobSetup$.subscribe((res) => {
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
    this.loadingSub = this.harvestingservice.customerLoading$.subscribe((val) => {
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
