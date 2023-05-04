/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TrainingService } from '../../../training.service';
import * as moment from 'moment';

@Component({
  selector: 'app-search-records',
  templateUrl: './search-records.page.html',
  styleUrls: ['./search-records.page.scss'],
})
export class SearchRecordsPage implements OnInit {
  formType: any;
  evaluationType: any;
  trainee_id: any;

// training records
  records: any;

   // behaviour subject for loader
   public loading = new BehaviorSubject(true);

// to use in HTML
moment: any = moment;
  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private route: ActivatedRoute,

  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      this.formType = params.formType;
    this.evaluationType = params.evaluationType;
    this.trainee_id = params.trainee_id;
    });

    // api call
    this.getRecords();
  }
  navigate(x: any,record: any){

    this.router.navigate(['/tabs/home/training/trainer/training-records/search-records/view-records'],
      {
        queryParams:{
          formType: x,
          recordId: record.record_id,
          trainerName: record.trainer_name
        }
      });
  }
getRecords(){
      this.trainingService
    .getRecordsById(this.trainee_id,this.formType,this.evaluationType)
    .subscribe((res)=>{
      this.loading.next(true);
      this.records = res.summary;
      this.loading.next(false);
    });
    }
}
