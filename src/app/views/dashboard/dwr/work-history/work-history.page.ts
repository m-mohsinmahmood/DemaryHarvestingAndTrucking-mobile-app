import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.page.html',
  styleUrls: ['./work-history.page.scss'],
})
export class WorkHistoryPage implements OnInit {
  segment: any = 'day';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  navigate(name: string){
    this.router.navigateByUrl('/tabs/home/dwr/detail',{
      state:{
        type: name
      }
    });
  }
}
