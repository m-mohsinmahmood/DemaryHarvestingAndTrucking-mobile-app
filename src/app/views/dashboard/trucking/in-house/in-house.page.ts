import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-in-house',
  templateUrl: './in-house.page.html',
  styleUrls: ['./in-house.page.scss'],
})
export class InHousePage implements OnInit {

  roleOptions = ['crew-chief', 'truck-driver']
  role = this.roleOptions[1];

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
