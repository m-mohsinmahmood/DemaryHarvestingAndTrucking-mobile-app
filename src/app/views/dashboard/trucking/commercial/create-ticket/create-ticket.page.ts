import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {

  options: any;
  imgRes: string[] = [];

  constructor(
    private location: Location,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  navigateTo(navURL: string) {
    this.router.navigateByUrl(navURL);
  }

  chooseImage(event) {

    for (let i = 0; i < event.target.files.length; i++) {
      this.imgRes.push(URL.createObjectURL(event.target.files[i]))
    }

  }
}
