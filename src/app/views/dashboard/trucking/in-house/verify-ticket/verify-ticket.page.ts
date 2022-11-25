import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

}
