import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-existing-order',
  templateUrl: './complete-existing-order.page.html',
  styleUrls: ['./complete-existing-order.page.scss'],
})
export class CompleteExistingOrderPage implements OnInit {

  constructor(private activeRoute: Router) { }

  ngOnInit() {
  }

  navigateTo() {
    this.activeRoute.navigateByUrl('/tabs/home/farming');
  }

}
