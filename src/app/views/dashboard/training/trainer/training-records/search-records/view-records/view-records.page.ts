import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.page.html',
  styleUrls: ['./view-records.page.scss'],
})
export class ViewRecordsPage implements OnInit {
  evaluationtype: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.router.getCurrentNavigation().extras.state.evaluationType);
    this.evaluationtype = this.router.getCurrentNavigation().extras.state.evaluationType;

  }

}
