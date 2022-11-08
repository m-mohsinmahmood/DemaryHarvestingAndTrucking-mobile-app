import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-farm',
  templateUrl: './change-farm.page.html',
  styleUrls: ['./change-farm.page.scss'],
})
export class ChangeFarmPage implements OnInit {

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
