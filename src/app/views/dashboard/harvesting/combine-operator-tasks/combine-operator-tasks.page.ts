import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-combine-operator-tasks',
  templateUrl: './combine-operator-tasks.page.html',
  styleUrls: ['./combine-operator-tasks.page.scss'],
})
export class CombineOperatorTasksPage implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
