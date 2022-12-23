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
      header: header,
      message: msg,
      position: position,
      duration: duration ? duration : 5000,
      color: color,
    });
    toast.present();
  }
}
