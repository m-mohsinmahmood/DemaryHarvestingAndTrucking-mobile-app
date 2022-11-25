import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-dwr',
  templateUrl: './verify-dwr.page.html',
  styleUrls: ['./verify-dwr.page.scss'],
})
export class VerifyDwrPage implements OnInit {

  constructor(
    private location: Location,
    private router: Router,

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
  navigate(name: string){
    this.router.navigateByUrl('/tabs/home/dwr/detail',{
      state:{
        type: name
      }
    });
  }

}
