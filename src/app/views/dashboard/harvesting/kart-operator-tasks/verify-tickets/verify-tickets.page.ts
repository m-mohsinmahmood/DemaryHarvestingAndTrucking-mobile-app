import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verify-tickets',
  templateUrl: './verify-tickets.page.html',
  styleUrls: ['./verify-tickets.page.scss'],
})
export class VerifyTicketsPage implements OnInit {

  segment = 'sent'; // For Segment

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
}
