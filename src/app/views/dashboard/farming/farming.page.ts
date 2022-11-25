import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './farming.page.html',
  styleUrls: ['./farming.page.scss'],
})
export class FarmingPage implements OnInit {

  role = ""

  constructor() { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

  }

}
