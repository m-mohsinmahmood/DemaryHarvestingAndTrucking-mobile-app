import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {

  constructor(private lcoation: Location, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.lcoation.back();
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }

}
