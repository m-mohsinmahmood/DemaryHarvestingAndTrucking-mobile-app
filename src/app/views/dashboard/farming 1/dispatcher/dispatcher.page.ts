import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.page.html',
  styleUrls: ['./dispatcher.page.scss'],
})
export class DispatcherPage implements OnInit {

  role = "dispatcher";

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
