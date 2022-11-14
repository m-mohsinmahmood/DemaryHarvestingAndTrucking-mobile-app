import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './farming.page.html',
  styleUrls: ['./farming.page.scss'],
})
export class FarmingPage implements OnInit {

  rolesOptions = ['dispatcher', 'tractor-driver']
  role = this.rolesOptions[0];

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
