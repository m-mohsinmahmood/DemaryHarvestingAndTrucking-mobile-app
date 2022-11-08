import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
role: any;
isReassign: boolean;
  constructor(
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.isReassign = this.router.getCurrentNavigation().extras.state.reassign;

  }
  goBack(){
    this.location.back();
  }
}
