import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderDetailPageRoutingModule } from './order-detail-routing.module';
import { OrderDetailPage } from './order-detail.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    TimerModule,
    HeaderModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailPageRoutingModule
    
  ],
  declarations: [OrderDetailPage]
})
export class OrderDetailPageModule {}
