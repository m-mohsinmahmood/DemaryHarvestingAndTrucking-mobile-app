import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './services/menu/menu.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isMobileDevice: boolean;

  constructor(
    private router: Router,
    private menu: MenuService,
    private auth: AuthService
  ) {
    this.checkDevicePlatform();
  }

  checkDevicePlatform() {
    if (this.isMobileDevice) {
      this.router.navigate(['login']);
    };
  }

  navigateToPage(url: string) {
    this.menu.changePage(url);
  }
}
