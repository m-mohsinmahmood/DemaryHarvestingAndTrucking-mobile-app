import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReassignTicketsPage } from './reassign-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: ReassignTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReassignTicketsPageRoutingModule {}
