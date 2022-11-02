import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-kart-operator-tasks',
  templateUrl: './kart-operator-tasks.page.html',
  styleUrls: ['./kart-operator-tasks.page.scss'],
})
export class KartOperatorTasksPage implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
