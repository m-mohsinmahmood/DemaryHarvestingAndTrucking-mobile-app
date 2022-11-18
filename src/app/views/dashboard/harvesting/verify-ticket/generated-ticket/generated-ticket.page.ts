import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-generated-ticket',
  templateUrl: './generated-ticket.page.html',
  styleUrls: ['./generated-ticket.page.scss'],
})
export class GeneratedTicketPage implements OnInit {
role: any;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

  }
  goBack(){
    this.location.back();
  }

}
