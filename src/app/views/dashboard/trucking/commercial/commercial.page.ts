import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.page.html',
  styleUrls: ['./commercial.page.scss'],
})
export class CommercialPage implements OnInit {

  roleOptions = ['crew-chief', 'truck-driver']
  role = this.roleOptions[0];

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
