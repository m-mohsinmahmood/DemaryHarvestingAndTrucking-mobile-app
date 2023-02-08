import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CheckInOutComponent } from './check-in-out.component';

@NgModule({
  declarations: [
    CheckInOutComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CheckInOutComponent
  ]
})
export class CheckInOutModule {
}
