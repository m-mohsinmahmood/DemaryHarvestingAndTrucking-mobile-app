import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReassignTicketPage } from './reassign-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: ReassignTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReassignTicketPageRoutingModule {}
