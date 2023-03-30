import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  activeHome = false;
  activeWeb = false;
  activeDWR = false;
  activeMessage = false;
  activeProfile = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.activeHome = !this.activeHome;
  }
  navigate(route: any) {
    if (route === 'home') {
      this.resetAll();
      this.activeHome = !this.activeHome;
      this.router.navigateByUrl('tabs/home');
    }
    if (route === 'web') {
      this.resetAll();
      this.activeWeb = !this.activeWeb;
    }
    if (route === 'dwr') {
      this.resetAll();
      this.activeDWR = !this.activeDWR;
      this.router.navigateByUrl('tabs/home/dwr');
    }
    if (route === 'message') {
      this.resetAll();
      this.activeMessage = !this.activeMessage;
    }
    if (route === 'profile') {
      this.resetAll();
      this.activeProfile = !this.activeProfile;
      this.router.navigateByUrl('tabs/profile');
    }
  }
  resetAll() {
    this.activeHome = false;
    this.activeWeb = false;
    this.activeDWR = false;
    this.activeMessage = false;
    this.activeProfile = false;
  }
}
