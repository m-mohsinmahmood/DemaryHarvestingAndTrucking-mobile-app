import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.page.html',
  styleUrls: ['./commercial.page.scss'],
})
export class CommercialPage implements OnInit {

  roleOptions = ['crew-chief', 'truck-driver'];
  role = this.roleOptions[1];

  constructor() { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

  }

}
