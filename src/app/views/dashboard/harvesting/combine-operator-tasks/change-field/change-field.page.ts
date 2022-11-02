import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-field',
  templateUrl: './change-field.page.html',
  styleUrls: ['./change-field.page.scss'],
})
export class ChangeFieldPage implements OnInit {
  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
