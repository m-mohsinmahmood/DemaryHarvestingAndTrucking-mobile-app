import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {

  options: any;
  rateSheetImg: string[] = [];
  originDocs: string[] = [];
  customDocs: string[] = [];

  roleOptions = ['dispatcher', 'truck-driver']
  role = this.roleOptions[1];

  constructor(
  ) { }

  ngOnInit() {
  }

  chooseImage(event) {
    if (event.target.name === 'rateSheet') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.rateSheetImg.push(URL.createObjectURL(event.target.files[i]))
      }
    }
    else if (event.target.name === 'originDocs') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.originDocs.push(URL.createObjectURL(event.target.files[i]))
      }
    }
    if (event.target.name === 'customDocs') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.customDocs.push(URL.createObjectURL(event.target.files[i]))
      }
    }
  }
}
