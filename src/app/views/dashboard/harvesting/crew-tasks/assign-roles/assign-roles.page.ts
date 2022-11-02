import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.page.html',
  styleUrls: ['./assign-roles.page.scss'],
})
export class AssignRolesPage implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
}
