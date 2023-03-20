/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DWRService } from '../../dwr.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.page.html',
  styleUrls: ['./view-job.page.scss'],
})
export class ViewJobPage implements OnInit {
  // dtae
  data: any;
  task_id: any;
  type: any;
notesForm: FormGroup;
status: any;
notes: any;

  // behaviour subject for loader
  public loading = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);
  constructor(
    private dwrService: DWRService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private location: Location


    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      console.log('PARAMS:',params);
      this.task_id= params.task_id;
      this.type= params.type;
      this.notes= params.notes;
    });
    this.initForm();

    // passing dummy job id from Customer_Job_Setup Table
    // this.dwrService
    //   .getJobById(this.task_id)
    //   .subscribe((res) => {
    //     this.loading.next(true);
    //     console.log('res', res);
    //     this.data = res;
    //     this.loading.next(false);
    //   });
    this.dwrService.getDWRById(this.task_id,'getTicketData')
      .subscribe((res)=>{
        console.log('Res:',res);
          this.loading.next(true);
          this.data = res;
          // for basic skills to get the sat/un-sat status
          if(this.data.trainingData.length > 0){

this.status = ((+this.data.trainingData[0].pullUpsInput_slb + +this.data.trainingData[0].encroachInput_slb < 3) && (this.data.trainingData[0].goal_slb === 'true') && (this.data.trainingData[0].finalPosition_slb === 'true')) &&
((+this.data.trainingData[0].pullUpsInput_ad + +this.data.trainingData[0].encroachInput_ad < 3) && (this.data.trainingData[0].goal_ad === 'true') && (this.data.trainingData[0].finalPosition_ad === 'true'))  &&
((+this.data.trainingData[0].encroach_osb + +this.data.trainingData[0].pullUps_osb < 3) && (this.data.trainingData[0].goal_osb === 'true') && (this.data.trainingData[0].finalPosition_osb === 'true')) &&
((+this.data.trainingData[0].pullUps_pb + +this.data.trainingData[0].encroach_pb < 3) && (this.data.trainingData[0].goal_pb === 'true') && (this.data.trainingData[0].finalPosition_pb === 'true')) &&
((+this.data.trainingData[0].pullUps_ps + +this.data.trainingData[0].encroach_ps < 3) && (this.data.trainingData[0].goal_ps === 'true') && (this.data.trainingData[0].finalPosition_ps === 'true')) &&
((+this.data.trainingData[0].pullUps_cou + +this.data.trainingData[0].encroach_cou < 3) && (this.data.trainingData[0].goal_cou === 'true') && (this.data.trainingData[0].finalPosition_cou === 'true'));

    // console.log('Status:',((+this.data.trainingData[0].pullUpsInput_slb + +this.data.trainingData[0].encroachInput_slb < 3) && (this.data.trainingData[0].goal_slb === 'true') && (this.data.trainingData[0].finalPosition_slb === 'true')) &&
    // ((+this.data.trainingData[0].pullUpsInput_ad + +this.data.trainingData[0].encroachInput_ad < 3) && (this.data.trainingData[0].goal_ad === 'true') && (this.data.trainingData[0].finalPosition_ad === 'true'))  &&
    // ((+this.data.trainingData[0].encroach_osb + +this.data.trainingData[0].pullUps_osb < 3) && (this.data.trainingData[0].goal_osb === 'true') && (this.data.trainingData[0].finalPosition_osb === 'true')) &&
    // ((+this.data.trainingData[0].pullUps_pb + +this.data.trainingData[0].encroach_pb < 3) && (this.data.trainingData[0].goal_pb === 'true') && (this.data.trainingData[0].finalPosition_pb === 'true')) &&
    // ((+this.data.trainingData[0].pullUps_ps + +this.data.trainingData[0].encroach_ps < 3) && (this.data.trainingData[0].goal_ps === 'true') && (this.data.trainingData[0].finalPosition_ps === 'true')) &&
    // ((+this.data.trainingData[0].pullUps_cou + +this.data.trainingData[0].encroach_cou < 3) && (this.data.trainingData[0].goal_cou === 'true') && (this.data.trainingData[0].finalPosition_cou === 'true')));
  }
    this.loading.next(false);
      });
  }
  initForm(){
    this.notesForm = this.formBuilder.group({
      notes: [''],
    });
  }
  exit(){
    this.router.navigate(['/tabs/home/dwr/work-history']);
  }
  verify(){
    this.loadingSpinner.next(true);
    this.dwrService
    .verify('changeDwrStatus', 'verify',this.notesForm.get('notes').value,this.task_id)
    .subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.loadingSpinner.next(false);

          // toast
          this.toastService.presentToast(res.mssage, 'task has been verified');

          // navigating
          this.location.back();


        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
        }
      },
      (err) => {
        console.log('ERROR::', err);
        this.loadingSpinner.next(false);
        this.toastService.presentToast(err.mssage, 'danger');
      }
    );
  }
  sendBack(){
    this.loadingSpinner.next(true);
    this.dwrService
    .verify('changeDwrStatus', 'reassigned',this.notesForm.get('notes').value,this.task_id)
    .subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.loadingSpinner.next(false);

          // toast
          this.toastService.presentToast(res.mssage, 'task has been verified');

          // navigating
          this.location.back();


        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
        }
      },
      (err) => {
        console.log('ERROR::', err);
        this.loadingSpinner.next(false);
        this.toastService.presentToast(err.mssage, 'danger');
      }
    );
  }
}
