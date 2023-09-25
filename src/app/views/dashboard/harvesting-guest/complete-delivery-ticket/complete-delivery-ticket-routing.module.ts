import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteDeliveryTicketPage } from './complete-delivery-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteDeliveryTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteDeliveryTicketPageRoutingModule {}
