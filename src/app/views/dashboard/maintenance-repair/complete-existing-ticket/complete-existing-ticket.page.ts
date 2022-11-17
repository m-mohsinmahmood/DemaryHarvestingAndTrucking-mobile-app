import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complete-existing-ticket',
  templateUrl: './complete-existing-ticket.page.html',
  styleUrls: ['./complete-existing-ticket.page.scss'],
})
export class CompleteExistingTicketPage implements OnInit {

  category = '';

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      this.category = param.category;
      console.log(this.category);
    })
  }

}
