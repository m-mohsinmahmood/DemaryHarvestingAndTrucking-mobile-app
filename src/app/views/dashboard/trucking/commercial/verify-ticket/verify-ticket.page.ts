import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.page.html',
  styleUrls: ['./verify-ticket.page.scss'],
})
export class VerifyTicketPage implements OnInit {

  segment = 'sent'; // For Segment
  segmentTruckDriver = 'existing'; // For Segment

  roleOptions = ['crew-chief', 'truck-driver']
  role = this.roleOptions[1];

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
