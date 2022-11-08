import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-field',
  templateUrl: './change-field.page.html',
  styleUrls: ['./change-field.page.scss'],
})
export class ChangeFieldPage implements OnInit {
role: any;
  constructor(
    private location: Location

  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

  }
  goBack(){
    this.location.back();
  }

}
