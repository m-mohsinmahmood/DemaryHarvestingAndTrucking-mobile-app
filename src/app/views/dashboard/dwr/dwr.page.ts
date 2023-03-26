import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dwr',
  templateUrl: './dwr.page.html',
  styleUrls: ['./dwr.page.scss'],
})
export class DwrPage implements OnInit {
  role: any;
  constructor(
    private location: Location

  ) { }

  ngOnInit() {
    // //getting role
    // this.role = localStorage.getItem('role');
  }
  goBack(){
    this.location.back();
  }
}
