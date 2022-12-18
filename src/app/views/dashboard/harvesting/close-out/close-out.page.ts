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
  constructor(
    private formBuilder: FormBuilder,
    private harvestingservice: HarvestingService,
    private toastService: ToastService

  ) { }

  ngOnInit() {
    this.closeJobForm = this.formBuilder.group({
      date: [''],
      total_acres: ['',[Validators.required]],
      total_gps_acres: ['',[Validators.required]],
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
          }else{
            console.log('Something happened :)');
          }
      },
      (err) => {
        console.log('Error in Close-Out Job:',err);
      },
  );
  }
  getDate(e){
    // console.log('Date:',e.detail.value);
    this.date = moment(e.detail.value).format('DD-MM-YYYY');
      }
}
