import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
