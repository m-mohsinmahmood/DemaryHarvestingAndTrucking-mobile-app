import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {

  constructor(private router: Router) { }

  roleOptions = ['crew-chief', 'truck-driver']
  role = this.roleOptions[1];

  ngOnInit() {
  }

  navigateTo(navURL: string) {
    this.router.navigateByUrl(navURL);
  }

}
