import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-close-combining',
  templateUrl: './close-combining.page.html',
  styleUrls: ['./close-combining.page.scss'],
})
export class CloseCombiningPage implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
