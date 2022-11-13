import { TimerComponent } from './timer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TimerComponent],
  imports: [CommonModule, IonicModule],

  exports: [TimerComponent],
})
export class TimerModule {}
