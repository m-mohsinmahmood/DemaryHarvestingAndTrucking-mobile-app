import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-close-out-order',
  templateUrl: './close-out-order.page.html',
  styleUrls: ['./close-out-order.page.scss'],
})
export class CloseOutOrderPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
