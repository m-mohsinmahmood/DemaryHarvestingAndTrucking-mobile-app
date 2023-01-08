import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-generated',
  templateUrl: './ticket-generated.page.html',
  styleUrls: ['./ticket-generated.page.scss'],
})
export class TicketGeneratedPage implements OnInit {

  data: any;
  nameArr: any;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.data = params;
      this.nameArr = this.data.uploadFile.split(',');
      console.log(this.nameArr);

    })
  }

  ngOnInit() {
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }
}
