import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-complete-existing-order',
  templateUrl: './complete-existing-order.page.html',
  styleUrls: ['./complete-existing-order.page.scss'],
})
export class CompleteExistingOrderPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
