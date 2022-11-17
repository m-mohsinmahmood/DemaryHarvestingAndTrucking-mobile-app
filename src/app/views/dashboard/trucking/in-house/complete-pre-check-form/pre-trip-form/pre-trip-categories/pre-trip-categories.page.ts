import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pre-trip-categories',
  templateUrl: './pre-trip-categories.page.html',
  styleUrls: ['./pre-trip-categories.page.scss'],
})
export class PreTripCategoriesPage implements OnInit {

  currentPage;
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      this.currentPage = param.page;
    })
  }
}
