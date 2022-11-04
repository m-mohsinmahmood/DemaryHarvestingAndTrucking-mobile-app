import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verify-orders',
  templateUrl: './verify-orders.page.html',
  styleUrls: ['./verify-orders.page.scss'],
})
export class VerifyOrdersPage implements OnInit {
  segment = 'sent'; // For Segment

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

}
