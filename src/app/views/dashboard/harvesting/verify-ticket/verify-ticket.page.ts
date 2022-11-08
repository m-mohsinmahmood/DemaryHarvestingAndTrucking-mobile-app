import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.page.html',
  styleUrls: ['./verify-ticket.page.scss'],
})
export class VerifyTicketPage implements OnInit {
  segment: any;
  role: any;
  constructor(
    private location: Location
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // passing the segment value conditionally
    this.segment = this.role === 'kart-operator'? 'sent' : 'received';

  }
  goBack(){
    this.location.back();
  }
}
