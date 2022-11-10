import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verify-dwrs',
  templateUrl: './verify-dwrs.page.html',
  styleUrls: ['./verify-dwrs.page.scss'],
})
export class VerifyDwrsPage implements OnInit {

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
}
