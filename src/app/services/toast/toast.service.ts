import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}
  async presentToast(
    msg,
    color: string,
    header?: string,
    position?: any,
    duration?: number
  ) {
    const toast = await this.toastController.create({
      header,
      message: msg,
      position,
      duration: duration ? duration : 1000,
      color,
      cssClass:'custom-toast'
    });
    toast.present();
  }
}
