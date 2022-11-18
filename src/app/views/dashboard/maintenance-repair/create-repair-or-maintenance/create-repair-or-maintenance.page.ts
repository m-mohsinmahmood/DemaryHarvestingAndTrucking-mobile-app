import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-repair-or-maintenance',
  templateUrl: './create-repair-or-maintenance.page.html',
  styleUrls: ['./create-repair-or-maintenance.page.scss'],
})
export class CreateRepairORMaintenancePage implements OnInit {

  category = '';

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      this.category = param.category
    })
  }
}
