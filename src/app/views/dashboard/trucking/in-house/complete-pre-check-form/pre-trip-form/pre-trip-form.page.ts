import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-trip-form',
  templateUrl: './pre-trip-form.page.html',
  styleUrls: ['./pre-trip-form.page.scss'],
})
export class PreTripFormPage implements OnInit {
  buffer = 1;
  progress = 0.2;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(navTo: string) {
    this.router.navigateByUrl(navTo);
  }
}
