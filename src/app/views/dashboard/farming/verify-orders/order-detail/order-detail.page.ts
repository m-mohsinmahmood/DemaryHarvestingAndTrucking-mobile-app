import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  constructor(
    private router: Router

  ) { }

  ngOnInit() {
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }

}
