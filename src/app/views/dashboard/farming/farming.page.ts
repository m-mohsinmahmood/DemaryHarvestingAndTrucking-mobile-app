import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './farming.page.html',
  styleUrls: ['./farming.page.scss'],
})
export class FarmingPage implements OnInit {

  rolesOptions = ['dispatcher', 'tractor-driver']
  role = this.rolesOptions[0];

  constructor() { }

  ngOnInit() {
  }

}
