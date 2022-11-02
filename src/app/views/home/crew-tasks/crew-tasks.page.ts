import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crew-tasks',
  templateUrl: './crew-tasks.page.html',
  styleUrls: ['./crew-tasks.page.scss'],
})
export class CrewTasksPage implements OnInit {
role = 'truck-driver';
  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
}
