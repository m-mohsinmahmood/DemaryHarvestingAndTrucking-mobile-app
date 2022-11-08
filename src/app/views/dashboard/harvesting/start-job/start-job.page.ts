import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-start-job',
  templateUrl: './start-job.page.html',
  styleUrls: ['./start-job.page.scss'],
})
export class StartJobPage implements OnInit {
role: any;
  constructor(
    private location: Location

  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

  }
  goBack(){
    this.location.back();
  }
}
