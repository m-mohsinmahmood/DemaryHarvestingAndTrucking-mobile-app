import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trucking',
  templateUrl: './trucking.page.html',
  styleUrls: ['./trucking.page.scss'],
})
export class TruckingPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back()
  }

}
