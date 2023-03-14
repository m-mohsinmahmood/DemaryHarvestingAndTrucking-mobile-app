import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrderPage } from './create-order.page';
import { TicketGeneratedPage } from '../ticket-generated/ticket-generated.page';

const routes: Routes = [
  {
    path: '',
    component: CreateOrderPage
  },
  {
    path: 'ticket-generated',
    component: TicketGeneratedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOrderPageRoutingModule { }
