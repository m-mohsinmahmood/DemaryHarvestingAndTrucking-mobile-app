import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketAssignedToPage } from './ticket-assigned-to.page';

const routes: Routes = [
  {
    path: '',
    component: TicketAssignedToPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketAssignedToPageRoutingModule {}
