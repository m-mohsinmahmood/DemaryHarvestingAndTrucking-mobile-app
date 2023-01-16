import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(
    private platform: Platform
  ) { }

  public isMobile(): boolean{
    if (this.platform.is('mobile')) {
      return true;
    } else if (this.platform.is('mobileweb')) {
      return true;
    } else if (this.platform.is('ios') || this.platform.is('android')) {
      return true;
    } else if (this.platform.is('desktop')) {
      return false;
    }
  }
}
