import { Component, OnInit } from '@angular/core';
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
  // behaviour subject for loader
  public loading = new BehaviorSubject(true);

  constructor(private dwrService: DWRService) {}

  ngOnInit() {
    // passing dummy job id from Customer_Job_Setup Table
    this.dwrService
      .getJobById('504ab52f-4a13-414c-82d8-cd6aee91641e')
      .subscribe((res) => {
        this.loading.next(true);
        console.log('res', res);
        this.data = res;
        this.loading.next(false);
      });
  }
}
