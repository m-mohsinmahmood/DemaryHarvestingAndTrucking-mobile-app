import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo() {
    this.router.navigateByUrl('/tabs/home')
  }

}
