import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  constructor(
    private location: Location,
    private router: Router

  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }

}
