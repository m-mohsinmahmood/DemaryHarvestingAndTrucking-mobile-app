import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

}
