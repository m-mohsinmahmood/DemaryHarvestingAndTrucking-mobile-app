import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  type: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.type = this.router.getCurrentNavigation().extras.state.type;
  }


}
