import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-records',
  templateUrl: './search-records.page.html',
  styleUrls: ['./search-records.page.scss'],
})
export class SearchRecordsPage implements OnInit {
  formType: any;
  evaluationType: any;

  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
    this.formType = this.router.getCurrentNavigation().extras.state.formType;
    this.evaluationType = this.router.getCurrentNavigation().extras.state.evaluationType;
    console.log('State',this.router.getCurrentNavigation().extras.state)
  }
  navigate(x: any){
    console.log('evaluation',x);
    this.router.navigateByUrl('/tabs/home/training/trainer/training-records/search-records/view-records',{
      state:{
        evaluationType: x
      }
    });
  }

}
