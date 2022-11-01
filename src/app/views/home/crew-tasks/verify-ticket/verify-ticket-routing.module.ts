import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyTicketPage } from './verify-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyTicketPageRoutingModule {}
