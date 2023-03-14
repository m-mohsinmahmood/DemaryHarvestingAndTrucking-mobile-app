import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dwr',
  templateUrl: './dwr.page.html',
  styleUrls: ['./dwr.page.scss'],
})
export class DwrPage implements OnInit {

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
}
