import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dwr',
  templateUrl: './dwr.page.html',
  styleUrls: ['./dwr.page.scss'],
})
export class DwrPage implements OnInit {
  role: any;
  constructor(
    private location: Location

  ) { }

  ngOnInit() {
    // //getting role
    this.role = localStorage.getItem('role');
    console.log(this.role);
    console.log(this.role.includes('Director','Crew Chief','Dispatcher', 'Supervisor','Trainer'));
    console.log(this.role.includes('Director','Crew Chief','Dispatcher','Supervisor'));
    console.log(this.role.includes('Trainer') || this.role.includes('Supervisor'));

  }
  goBack(){
    this.location.back();
  }
}
