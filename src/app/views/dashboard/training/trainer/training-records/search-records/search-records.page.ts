import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-records',
  templateUrl: './search-records.page.html',
  styleUrls: ['./search-records.page.scss'],
})
export class SearchRecordsPage implements OnInit {
  formType: any;

  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
    this.formType = this.router.getCurrentNavigation().extras.state.formType;

  }

}
