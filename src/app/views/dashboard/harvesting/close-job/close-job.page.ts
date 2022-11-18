import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-close-job',
  templateUrl: './close-job.page.html',
  styleUrls: ['./close-job.page.scss'],
})
export class CloseJobPage implements OnInit {
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
