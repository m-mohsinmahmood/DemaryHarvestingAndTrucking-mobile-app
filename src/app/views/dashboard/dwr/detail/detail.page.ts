/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DWRService } from '../dwr.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  [x: string]: any;
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
  dateLogoutFormatted: any = moment(new Date()).format('MM-DD-YYYY hh:mm:ss A');
  dateLoginFormatted: any = moment(new Date()).format('MM-DD-YYYY hh:mm:ss A');
  supervisorNotes: string = '';
  isOpen = false;
  isOpen2 = false;
  isPopoverOpen = false;
  model_id;
  reAssignmodel_id;
  isModalOpen = false;
  isReassignModalOpen = false;
  reassignSupervisor: FormGroup;
  reassignEmployee: FormGroup;

  // behaviour subject for loader
  public loading = new BehaviorSubject(true);
  public loaderModel = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private dwrService: DWRService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    //getting employee details
    this.reassignSupervisor = this.formBuilder.group({
      supervisorNotes: ['', [Validators.required]],
      employeeNotes: ['']
    });

    this.reassignEmployee = this.formBuilder.group({
      employeeNotes: ['', [Validators.required]],
      supervisorNotes: ['']
    });

    console.log(this.isModalOpen);

    this.isModalOpen = false;
    this.isReassignModalOpen = false;

    this.getEmployeeDetails();

    // this.dateLoginFormatted = moment(new Date()).format('MM-DD-YYYY hh:mm:ss A');
    // this.dateLogoutFormatted = moment(new Date()).format('MM-DD-YYYY hh:mm:ss A');

    this.route.queryParams.subscribe((params) => {
      console.log('PARAMS:', params);
      this.type = params.dwr_type;
      this.date = params.date;
      this.dwr_employee_id = params.employee_id;

      // conditionally checking types to render data
      if (this.type === 'verify' || this.type === 'send-back' || this.type === 'detail') {
        this.getTickets();
      }
      else if (this.type === 'work-history') {
        this.getDWRDetailsWithStatus('all');
      }
    });
  }
  async ionViewDidEnter() {
    this.getEmployeeDetails();
    if (this.type === 'verify') {
      this.getTickets();
    }
    else if (this.type === 'work-history') {
      // this.getDWRDetailsWithStatus('all');
      this.getAll();
      this.getVerified();
      this.getUnVerified();
      this.getReassigned();
    }
  }
  async ionModalDidDismiss() {
    this.isOpen = false;
  }
  // async ionPopoverDidDismiss(){
  //  this.isPopoverOpen = false;
  // }

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
      .getDWRDetails(this.dwr_employee_id, this.date, 'getDWRDetails', 'day', 'pendingVerification')
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

    this.dwrService.reassignDWR('reassignDwr', id, '', '', '', '').subscribe(
      (res) => {
        if (res.status === 200) {
          this.loadingSpinner.next(false);

          // calling again date DWR
          this.getTickets();



          this.toastService.presentToast('Ticket reassigned', 'success');
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

  getDWRDetailsWithStatus(status) {
    {
      console.log('status', status);
      if (status === 'all') { this.getAll(); };
      if (status === 'verified') { this.getVerified(); };
      if (status === 'pendingVerification') { this.getUnVerified(); };
      if (status === 'reassigned') { this.getReassigned(); };
    }
  }
  getAll() {
    this.loading.next(true);
    this.dwrService
      .getDWRDetailsWithStatus('getDWRList', this.date, 'day', this.dwr_employee_id, 'all')
      .subscribe((res) => {
        this.loading.next(true);
        this.workHistoryData = res.dwr;
        this.loading.next(false);
      });
  }
  getVerified() {
    this.loading.next(true);
    this.dwrService
      .getDWRDetailsWithStatus('getDWRList', this.date, 'day', this.dwr_employee_id, 'verified')
      .subscribe((res) => {
        this.loading.next(true);
        this.verifiedData = res.dwr;
        this.loading.next(false);
      });
  }
  getUnVerified() {
    this.loading.next(true);
    this.dwrService
      .getDWRDetailsWithStatus('getDWRList', this.date, 'day', this.dwr_employee_id, 'pendingVerification')
      .subscribe((res) => {
        this.loading.next(true);
        this.unVerifiedData = res.dwr;
        this.loading.next(false);
      });
  }
  getReassigned() {
    this.loading.next(true);
    this.dwrService
      .getDWRDetailsWithStatus('getDWRList', this.date, 'day', this.dwr_employee_id, 'reassigned')
      .subscribe((res) => {
        this.loading.next(true);
        this.reassignedData = res.dwr;
        this.loading.next(false);
      });
  }


  getLoginDate(e) {
    console.log(e.detail.value);
    this.dateLogin = e.detail.value;
    // this.dateLoginFormatted = moment(e.detail.value).format('MM-DD-YYYYThh:mm:ss');
    this.dateLoginFormatted = e.detail.value;

  }
  getLogoutDate(e) {
    this.dateLogout = e.detail.value;
    // this.dateLogoutFormatted = moment(e.detail.value).format('MM-DD-YYYYThh:mm:ss');
    this.dateLogoutFormatted = e.detail.value;

  }
  openModel(id, data) {
    this.isOpen = true;
    this.model_id = id;

    this.dateLoginFormatted = moment(data.login_time).format('YYYY-MM-DDTHH:mm:ss');
    this.dateLogoutFormatted = moment(data.logout_time).format('YYYY-MM-DDTHH:mm:ss');
    console.log(data);

    this.reassignEmployee.patchValue({
      supervisorNotes:data.supervisor_notes
    })
  }

  openReassignModel(id, data) {
    this.isReassignModalOpen = true;
    this.reAssignmodel_id = id;
    this.reassignSupervisor.patchValue({
      employeeNotes:data.employee_notes
    })  }

    editReassigned(id) {
      this.loadingSpinner.next(true);
      console.log(this.isReassignModalOpen);
      this.isReassignModalOpen = false;

      this.id = id;
      // start loader
      this.loadingSpinner.next(true);

      this.dwrService.reassignDWR('reassignDwr', id, '', '', this.reassignSupervisor.get('supervisorNotes').value,'').subscribe(
        (res) => {
          if (res.status === 200) {
            this.reassignSupervisor.reset();
            this.loadingSpinner.next(false);
            // calling again date DWR
            this.getTickets();
            this.isReassignModalOpen = false;
            this.toastService.presentToast('Ticket reassigned', 'success');
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
            this.loadingSpinner.next(false);
            this.isReassignModalOpen = false;
          }
        },
        (err) => {
          this.toastService.presentToast(err.mssage, 'danger');
          this.loadingSpinner.next(false);
          this.isReassignModalOpen = false;
        }
      );
    }

  edit(id) {

    this.loadingSpinner.next(true);
    console.log(this.isModalOpen);
    this.isOpen = false;

    this.dwrService.reassignDWR('editDwr', id, this.dateLogin, this.dateLogout, '', this.reassignEmployee.get('employeeNotes').value).subscribe(
      (res) => {
        if (res.status === 200) {
          this.loadingSpinner.next(false);
          this.reassignEmployee.reset();
          // calling reassigned tickets
          this.getReassigned();

          // close model
          this.isOpen = false;

          this.toastService.presentToast('Ticket edited', 'success');
        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
          this.loadingSpinner.next(false);
          this.isOpen = false;
        }
      },
      (err) => {
        this.toastService.presentToast(err.mssage, 'danger');
        this.loadingSpinner.next(false);
        this.isOpen = false;
      }

    );
  }
}


