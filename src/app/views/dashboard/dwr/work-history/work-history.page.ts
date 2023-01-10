import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DWRService } from '../dwr.service';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.page.html',
  styleUrls: ['./work-history.page.scss'],
})
export class WorkHistoryPage implements OnInit {
  segment: any = 'day';
  date: any = moment(new Date()).format('YYYY-MM-DD');
  month: any = moment(new Date()).format('MM-YYYY');
  isOpen;
  constructor(private router: Router, private dwrService: DWRService) {}

  ngOnInit() {}
  getDate(e) {
    // console.log('Date:',e.detail.value);
    this.date = moment(e.detail.value).format('YYYY-MM-DD');
    this.isOpen = false;
  }
  getMonth(e) {
    // console.log('Month:',e.detail.value);
    this.month = moment(e.detail.value).format('YYYY-MM-DD');
    this.isOpen = false;
  }

  navigate(name: string) {
    this.router.navigateByUrl('/tabs/home/dwr/detail', {
      state: {
        type: name,
      },
    });
  }
  getDWRByDate(){
    console.log(this.date)
    this.dwrService.getDWR('f4cfa75b-7c14-4b68-a192-00d56c9f2022','',this.date).subscribe((res)=>{
      console.log('Res',res)
    })
  }
}
