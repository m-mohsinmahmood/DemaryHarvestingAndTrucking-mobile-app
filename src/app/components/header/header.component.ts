import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
@Input() title: any;
@Input() color: any;
  constructor(
    private location: Location
  ) { }

  ngOnInit() { }
  goBack() {
    this.location.back();
  }
}
