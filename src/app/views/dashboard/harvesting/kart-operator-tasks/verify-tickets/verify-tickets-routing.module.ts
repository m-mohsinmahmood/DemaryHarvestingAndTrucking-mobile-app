import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyTicketsPage } from './verify-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyTicketsPageRoutingModule {}
