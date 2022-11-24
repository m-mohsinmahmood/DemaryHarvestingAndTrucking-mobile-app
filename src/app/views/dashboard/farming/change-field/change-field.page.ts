import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-field',
  templateUrl: './change-field.page.html',
  styleUrls: ['./change-field.page.scss'],
})
export class ChangeFieldPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo() {
    this.router.navigateByUrl('/tabs/home/farming');
  }

}
