/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DWRService } from '../dwr.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  // segment: any = 'view-tasks';
  type: any;

  // data
  workHistoryData: any;
  verifiedData: any;
  unVerifiedData: any;
  reassignedData: any;
  data: any;
  dwr_id: any;
  role = '';
  dwr_type: any;
  employee_id: any;
  dwrData: any;
  date: any;
  moment: any = moment;
  segment = 'all';
  id: any;
  dwr_employee_id: any;
  dateLogin: any = moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ');
  dateLogout: any = moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ');
  dateLoginFormatted: any = moment(new Date()).format('YYYY-MM-DD hh:mm:ss A');
  dateLogoutFormatted: any = moment(new Date()).format('YYYY-MM-DD hh:mm:ss A');
  isOpen = false;


  // behaviour subject for loader
  public loading = new BehaviorSubject(true);
  public loaderModel = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private dwrService: DWRService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    //getting employee details
    this.getEmployeeDetails();

    this.route.queryParams.subscribe((params) => {
      console.log('PARAMS:', params);
      this.type = params.dwr_type;
      // this.dwr_id= params.dwr_id;
      // this.dwr_type= params.dwr_type;
      this.date = params.date;
      this.dwr_employee_id = params.employee_id;
      // this.dwrData = JSON.parse(params.dwrData);
      //   this.formType = params.formType;
      // this.evaluationType = params.evaluationType;
      // this.trainee_id = params.trainee_id;

      // conditionally checking types to render data
      if (this.type === 'verify' || this.type === 'send-back' || this.type === 'detail') {
        this.getTickets();
      }
      else if(this.type === 'work-history'){
        this.getDWRDetailsWithStatus('all');
      }
    });
  }
  async ionViewDidEnter() {
    this.getEmployeeDetails();
    if (this.type === 'verify') {
      this.getTickets();
    }
    else if(this.type === 'work-history'){
      // this.getDWRDetailsWithStatus('all');
      this.getAll();
      this.getVerified();
      this.getUnVerified();
      this.getReassigned();
    }
  }
  async ionModalDidDismiss(){
    this.isOpen = false;
  }
  getEmployeeDetails() {
    this.role = localStorage.getItem('role');
    this.employee_id = localStorage.getItem('employeeId');
  }
  getJob() {
    this.router.navigateByUrl('/tabs/home/dwr/detail/view-job');
  }
  getJobById(job_id: any) {
    this.dwrService.getJobById(job_id).subscribe((res) => {
      this.loaderModel.next(true);
      this.data = res;
      this.loaderModel.next(false);
    });
  }
  getWordOrderById(work_order_id: any) {
    console.log('Work Order Called');
    this.dwrService.getWordOrderById(work_order_id).subscribe((res) => {
      this.loaderModel.next(true);
      this.data = res;
      this.loaderModel.next(false);
    });
  }
  getMainenanceRepairTicketById(main_repair_ticket_id: any) {
    this.dwrService
      .getMainenanceRepairTicketById(main_repair_ticket_id)
      .subscribe((res) => {
        console.log('res::', res);
        this.loaderModel.next(true);
        this.data = res[0];
        this.loaderModel.next(false);
      });
  }
  gettrainingRecordById(training_record_id: any) {
    this.dwrService
      .gettrainingRecordById(training_record_id)
      .subscribe((res) => {
        console.log('res::', res);
        this.loaderModel.next(true);
        this.data = res[0];
        this.loaderModel.next(false);
      });
  }
  navigate(task_id: any, type, notes, dwr_type) {
    this.router.navigate(['/tabs/home/dwr/detail/view-job'], {
      queryParams: {
        task_id,
        type,
        notes,
        dwr_type,
      },
    });
  }
  getTickets() {
    let type;
    if (this.type === 'verify') {
      type = 'getAssignedDWR';
    } else {
      type = 'getMyDWR';
    }

    // this.dwrService.getDWRById(this.dwr_id,'getTasks',this.dwr_type, this.employee_id, type)
    //   .subscribe((res)=>{
    //     console.log('Res:',res);
    //       this.loading.next(true);
    //       this.workHistoryData = res;
    //       this.loading.next(false);
    //   });
    this.dwrService
      .getDWRDetails(this.dwr_employee_id, this.date, 'getDWRDetails', 'day','pendingVerification')
      .subscribe((res) => {
        this.loading.next(true);
        this.workHistoryData = res.dwr;
        this.loading.next(false);
      });
  }
  reassign(id) {
    this.id = id;
    // start loader
    this.loadingSpinner.next(true);

    this.dwrService.reassignDWR('reassignDwr', id,'','').subscribe(
      (res) => {
        if (res.status === 200) {
          this.loadingSpinner.next(false);

          // calling again date DWR
          this.getTickets();

          this.toastService.presentToast('Ticket reassigned', 'success');
          // this.router.navigateByUrl('/tabs/home/maintenance-repair');
        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
          this.loadingSpinner.next(false);
        }
      },
      (err) => {
        this.toastService.presentToast(err.mssage, 'danger');
        this.loadingSpinner.next(false);
      }
    );
  }
  getDWRDetailsWithStatus(status){
   {
    console.log('status',status);
    if(status === 'all'){ this.getAll();};
    if(status === 'verified'){ this.getVerified();};
    if(status === 'pendingVerification'){ this.getUnVerified();};
    if(status === 'reassigned'){ this.getReassigned();};
  }
}
getAll(){
  this.dwrService
  .getDWRDetailsWithStatus('getDWRList',this.date, 'day', this.dwr_employee_id,'all')
  .subscribe((res) => {
    this.loading.next(true);
    this.workHistoryData = res.dwr;
    this.loading.next(false);
  });
}
getVerified(){
  this.dwrService
  .getDWRDetailsWithStatus('getDWRList',this.date, 'day', this.dwr_employee_id,'verified')
  .subscribe((res) => {
    this.loading.next(true);
    this.verifiedData = res.dwr;
    this.loading.next(false);
  });
}
getUnVerified(){
  this.dwrService
  .getDWRDetailsWithStatus('getDWRList',this.date, 'day', this.dwr_employee_id,'pendingVerification')
  .subscribe((res) => {
    this.loading.next(true);
    this.unVerifiedData = res.dwr;
    this.loading.next(false);
  });
}
getReassigned(){
  this.dwrService
  .getDWRDetailsWithStatus('getDWRList',this.date, 'day', this.dwr_employee_id,'reassigned')
  .subscribe((res) => {
    this.loading.next(true);
    this.reassignedData = res.dwr;
    this.loading.next(false);
  });
}
getLoginDate(e){
  console.log(e.detail.value);
  this.dateLogin = e.detail.value;
  this.dateLoginFormatted = moment(e.detail.value).format('MM-DD-YYYY hh:mm:ss A');
}
getLogoutDate(e){
  this.dateLogout = e.detail.value;
  this.dateLogoutFormatted = moment(e.detail.value).format('MM-DD-YYYY hh:mm:ss A');
}
openModel(){
  this.isOpen = true;

}
edit(id){

  this.loadingSpinner.next(true);

    this.dwrService.reassignDWR('editDwr', id,this.dateLogin,this.dateLogout).subscribe(
      (res) => {
        if (res.status === 200) {
          this.loadingSpinner.next(false);

          // calling reassigned tickets
          this.getReassigned();

          // close model
          this.isOpen = false;


          this.toastService.presentToast('Ticket reassigned', 'success');
          // this.router.navigateByUrl('/tabs/home/maintenance-repair');
        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
          this.loadingSpinner.next(false);
        }
      },
      (err) => {
        this.toastService.presentToast(err.mssage, 'danger');
        this.loadingSpinner.next(false);
      }
    );
}

}
