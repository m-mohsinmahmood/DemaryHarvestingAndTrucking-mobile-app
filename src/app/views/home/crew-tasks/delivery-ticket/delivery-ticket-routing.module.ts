import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryTicketPage } from './delivery-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryTicketPageRoutingModule {}
