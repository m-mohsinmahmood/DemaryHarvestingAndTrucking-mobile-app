import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-existing-order',
  templateUrl: './existing-order.page.html',
  styleUrls: ['./existing-order.page.scss'],
})
export class ExistingOrderPage implements OnInit {

  segment = 'existing'; // For Segment

  constructor(

  ) { }

  ngOnInit() {
  }
}
