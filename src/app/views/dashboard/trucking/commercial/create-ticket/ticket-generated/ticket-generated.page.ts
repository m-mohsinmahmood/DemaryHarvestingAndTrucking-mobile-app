import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-generated',
  templateUrl: './ticket-generated.page.html',
  styleUrls: ['./ticket-generated.page.scss'],
})
export class TicketGeneratedPage implements OnInit {

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
