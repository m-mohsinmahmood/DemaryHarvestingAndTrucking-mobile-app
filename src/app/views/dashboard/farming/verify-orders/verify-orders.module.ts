import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerifyOrdersPageRoutingModule } from './verify-orders-routing.module';
import { VerifyOrdersPage } from './verify-orders.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    HeaderModule,
    TimerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyOrdersPageRoutingModule
  ],
  declarations: [VerifyOrdersPage]
})
export class VerifyOrdersPageModule { }
