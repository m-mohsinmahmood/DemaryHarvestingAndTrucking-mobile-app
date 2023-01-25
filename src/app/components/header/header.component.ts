import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: any;
  @Input() color: any;
  constructor(private location: Location, private router: Router) {}

  ngOnInit() {}

  goBack() {
    // conditions for pre-check-form pages to go back on specific page
    if (
      this.location.path() ===
      '/tabs/home/harvesting/complete-pre-check-form/pre-trip-form'
    ) {
      this.router.navigateByUrl(
        '/tabs/home/harvesting/complete-pre-check-form'
      );
    } else if (
      this.location.path() === '/tabs/home/harvesting/complete-pre-check-form'
    ) {
      this.router.navigateByUrl('/tabs/home/harvesting');
    } else if (this.location.path() === '/tabs/home/harvesting') {
      this.router.navigateByUrl('/tabs/home');
    } else {
      if (
        this.location.path().includes('training/trainer/basic-skills') ||
        this.location.path().includes('training/trainer/road-skills') ||
        this.location.path().includes('training/trainer/pre-trip')
      ) {
        this.router.navigateByUrl('/tabs/home/training/trainer');
      } else {
        this.location.back();
      }
    }
  }
}
