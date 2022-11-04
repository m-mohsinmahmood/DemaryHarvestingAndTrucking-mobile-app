import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket-generated',
  templateUrl: './ticket-generated.page.html',
  styleUrls: ['./ticket-generated.page.scss'],
})
export class TicketGeneratedPage implements OnInit {

  segment = 'sent'; // For Segment

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

}
