/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DWRService } from '../../dwr.service';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.page.html',
  styleUrls: ['./view-job.page.scss'],
})
export class ViewJobPage implements OnInit {
  // dtae
  data: any;
  task_id: any;
  // behaviour subject for loader
  public loading = new BehaviorSubject(true);

  constructor(
    private dwrService: DWRService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      console.log('PARAMS:',params);
      this.task_id= params.task_id;
    });

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
          this.loading.next(false);
      });
  }
  exit(){
    this.router.navigate(['/tabs/home/dwr/work-history']);
  }
}
