import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-house',
  templateUrl: './in-house.page.html',
  styleUrls: ['./in-house.page.scss'],
})
export class InHousePage implements OnInit {

  roleOptions = ['crew-chief', 'truck-driver']
  role = this.roleOptions[0];

  constructor() { }

  ngOnInit() {
  }

}
