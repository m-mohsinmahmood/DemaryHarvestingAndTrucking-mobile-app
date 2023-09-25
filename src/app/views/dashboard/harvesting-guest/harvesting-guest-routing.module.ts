import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HarvestingGuestPage } from './harvesting-guest.page';

const routes: Routes = [
  {
    path: '',
    component: HarvestingGuestPage
  },
  {
    path: 'complete-delivery-ticket',
    loadChildren: () => import('./complete-delivery-ticket/complete-delivery-ticket.module').then( m => m.CompleteDeliveryTicketPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HarvestingGuestPageRoutingModule {}
