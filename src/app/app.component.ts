import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from './services/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isMobileDevice: boolean;

  constructor(
    private router: Router,
    private menu: MenuService
  ) {
    this.checkDevicePlatform();
  }

  checkDevicePlatform(){
    if(this.isMobileDevice){
      this.router.navigate(['login']);
    } ;
  }

  navigateToPage(url: string){
    this.menu.changePage(url);
  }

}
