import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-close-out-order',
  templateUrl: './close-out-order.page.html',
  styleUrls: ['./close-out-order.page.scss'],
})
export class CloseOutOrderPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo() {
    this.router.navigateByUrl('/tabs/home/farming')
  }

}
