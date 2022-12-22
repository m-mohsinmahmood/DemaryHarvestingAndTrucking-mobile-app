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
  closeJobForm: FormGroup;
  date: any = moment(new Date()).format('DD-MM-YYYY');
  customerData: any;
  isLoading: any;
  constructor(
    private formBuilder: FormBuilder,
    private harvestingservice: HarvestingService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.closeJobForm = this.formBuilder.group({
      customer_id: [],
      is_close: [true],
      date: [''],
      total_acres: ['',[Validators.required]],
      total_gps_acres: ['',[Validators.required]],
    });
    this.initApis();
    this.initObservables();
  }
  initApis(){
    this.harvestingservice.getJob();
  }
  initObservables(){
    this.harvestingservice.customer$.subscribe((res)=>{
      console.log(res);
      this.customerData = res;
      this.closeJobForm.patchValue({
        customer_id: this.customerData?.customer_job[0].customer_id
      });
    });
    this.harvestingservice.customerLoading$.subscribe((val)=>{
      this.isLoading = val;
    });
  }
  submit(){
    console.log(this.closeJobForm.value);
    this.harvestingservice.closeOutJob(this.closeJobForm.value).subscribe(
      (res: any) => {
          console.log('Response of Close-Out Job:',res);
          if(res.status === 200){
            this.closeJobForm.reset();
            this.toastService.presentToast(res.message,'success');
          } else{
            console.log('Something happened :)');
          }
      },
      (err) => {
        console.log('Error in Close-Out Job:',err);
      },
  );
  }
  getDate(e){
    console.log('Date:',e.detail.value);
    this.closeJobForm.patchValue({date: e.detail.value});
    this.date = moment(e.detail.value).format('DD-MM-YYYY');
      }
}
