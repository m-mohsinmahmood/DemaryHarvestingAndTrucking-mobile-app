import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-start-combining',
  templateUrl: './start-combining.page.html',
  styleUrls: ['./start-combining.page.scss'],
})
export class StartCombiningPage implements OnInit {

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }


}
