import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-harvesting',
  templateUrl: './harvesting.page.html',
  styleUrls: ['./harvesting.page.scss'],
})
export class HarvestingPage implements OnInit {
// role= 'combine-operator';
role: any;
  constructor(
    private location: Location,
   private router: Router,
  ) { }

  ngOnInit() {
    // console.log('AAA',localStorage.getItem('role'));
    this.role = localStorage.getItem('role');
  }
  goBack(){
    this.location.back();
  }
  navigate(route){
    if (route === 'ticket') {
      this.router.navigateByUrl('dashboard/harvesting/ticket',{
        state:{
          reassign: false
        }
      });
    } else {
      this.router.navigateByUrl('dashboard/harvesting/ticket',{
        state:{
          reassign: true
        }
      });
    }

  }
}
