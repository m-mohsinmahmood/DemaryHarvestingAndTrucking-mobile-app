import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratedTicketPage } from './generated-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratedTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratedTicketPageRoutingModule {}
