/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DWRService } from '../dwr.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  segment: any = 'view-tasks';
  type: any;

  // data
  workHistoryData: any;
  data: any;
  dwr_id: any;
  role = '';
  dwr_type: any;

  // behaviour subject for loader
  public loading = new BehaviorSubject(true);
  public loaderModel = new BehaviorSubject(true);

  constructor(
    private router: Router,
    private dwrService: DWRService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    // this.type = this.router.getCurrentNavigation().extras.state.type;
    // console.log('State:',this.router.getCurrentNavigation().extras.state);

    //getting role
    this.getEmployeeDetails();

    this.route.queryParams.subscribe((params)=>{
      console.log('PARAMS:',params);
      this.type = params.type;
      this.dwr_id= params.dwr_id;
      this.dwr_type= params.dwr_type;
    //   this.formType = params.formType;
    // this.evaluationType = params.evaluationType;
    // this.trainee_id = params.trainee_id;


    // conditionally checking types to render data
    if(this.type === 'work-history' || this.type === 'verify' ){
      // this.dwrService.getDWRById(this.dwr_id,'getTasks')
      // .subscribe((res)=>{
      //   console.log('Res:',res);
      //     this.loading.next(true);
      //     this.workHistoryData = res;
      //     this.loading.next(false);
      // });
      this.getTickets();
    }
  });
  }
  async ionViewDidEnter(){
    this.getEmployeeDetails();
  }
  getEmployeeDetails(){
    this.role = localStorage.getItem('role');
  }
  getJob(){
    this.router.navigateByUrl('/tabs/home/dwr/detail/view-job');
  }
  getJobById(job_id: any){
    this.dwrService
      .getJobById(job_id)
      .subscribe((res) => {
        this.loaderModel.next(true);
        this.data = res;
        this.loaderModel.next(false);
      });
  }
  getWordOrderById(work_order_id: any){
    console.log('Work Order Called');
    this.dwrService
      .getWordOrderById(work_order_id)
      .subscribe((res) => {
        this.loaderModel.next(true);
        this.data = res;
        this.loaderModel.next(false);
      });
  }
  getMainenanceRepairTicketById(main_repair_ticket_id: any){
    this.dwrService
      .getMainenanceRepairTicketById(main_repair_ticket_id)
      .subscribe((res) => {
        console.log('res::',res);
        this.loaderModel.next(true);
        this.data = res[0];
        this.loaderModel.next(false);
      });
  }
  gettrainingRecordById(training_record_id: any){
    this.dwrService
      .gettrainingRecordById(training_record_id)
      .subscribe((res) => {
        console.log('res::',res);
        this.loaderModel.next(true);
        this.data = res[0];
        this.loaderModel.next(false);
      });
  }
  navigate(task_id: any,type, notes,dwr_type) {
    this.router.navigate(['/tabs/home/dwr/detail/view-job'], {
      queryParams: {
        task_id,
        type,
        notes,
        dwr_type
      },
    });
  }
  getTickets(){
    this.dwrService.getDWRById(this.dwr_id,'getTasks',this.dwr_type)
      .subscribe((res)=>{
        console.log('Res:',res);
          this.loading.next(true);
          this.workHistoryData = res;
          this.loading.next(false);
      });
  }

}
