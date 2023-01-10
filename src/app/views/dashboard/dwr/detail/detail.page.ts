import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DWRService } from '../dwr.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  type: any;

  // data
  workHistoryData: any;

  // behaviour subject for loader
  public loading = new BehaviorSubject(true);

  constructor(
    private router: Router,
    private dwrService: DWRService
  ) { }

  ngOnInit() {
    this.type = this.router.getCurrentNavigation().extras.state.type;
    console.log('State:',this.router.getCurrentNavigation().extras.state);

    // conditionally checking types to render data
    if(this.type === 'work-history'){
      this.dwrService.getDWRById(this.router.getCurrentNavigation().extras.state.id)
      .subscribe((res)=>{
        console.log('Res:',res);
          this.loading.next(true);
          this.workHistoryData = res;
          this.loading.next(false);
      });
    }
  }
  getJob(){
    console.log('first');
    this.router.navigateByUrl('/tabs/home/dwr/detail/view-job');
  }
}
