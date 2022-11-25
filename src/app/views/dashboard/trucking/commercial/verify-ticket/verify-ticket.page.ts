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

  roleOptions = ['dispatcher', 'truck-driver']
  role = this.roleOptions[1];

  constructor(private location: Location) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  goBack() {
    this.location.back();
  }

}
