import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-tickets',
  templateUrl: './assign-tickets.page.html',
  styleUrls: ['./assign-tickets.page.scss'],
})
export class AssignTicketsPage implements OnInit {

  segment = "unassigned"

  constructor() { }

  ngOnInit() {
  }

}
