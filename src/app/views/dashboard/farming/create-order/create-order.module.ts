import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateOrderPageRoutingModule } from './create-order-routing.module';
import { CreateOrderPage } from './create-order.page';
import { HeaderModule } from '../../../../components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
@NgModule({
  imports: [
    HeaderModule,
    TimerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOrderPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateOrderPage]
})
export class CreateOrderPageModule { }
