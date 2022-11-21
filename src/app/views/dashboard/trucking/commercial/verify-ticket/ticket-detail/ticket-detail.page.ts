import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }

}
