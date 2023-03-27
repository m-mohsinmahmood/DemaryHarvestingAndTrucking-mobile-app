import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteExistingTicketPage } from './complete-existing-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteExistingTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteExistingTicketPageRoutingModule {}
