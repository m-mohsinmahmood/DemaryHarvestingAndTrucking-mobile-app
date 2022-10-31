import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { pageView} from './menu.pages';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  constructor(
    private menu: MenuController,
    private router: Router
  ) { }

  public showMenu(){
    this.menu.enable(true);
  }

  public hideMenu(){
    this.menu.enable(false);
  }

  public collapseMenu(){
    if(this.menu.isOpen()){
      this.menu.close();
    }
  }



  public changePage(url:string){
    this.collapseMenu();
    this.router.navigate([url], { replaceUrl: true, skipLocationChange: false });
  }

  

 

}
