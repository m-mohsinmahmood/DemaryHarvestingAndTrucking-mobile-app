import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
role = 'kart-operator';
role2= 'dispatcher';
  constructor() { }

  ngOnInit() {
  }

}
