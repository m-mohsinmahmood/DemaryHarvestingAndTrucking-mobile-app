import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  roleOptions = ['crew-chief','kart-operator','combine-operator','truck-driver'];
role = this.roleOptions[0];
  constructor() { }

  ngOnInit() {
    localStorage.setItem('role',this.role);
  }

}
