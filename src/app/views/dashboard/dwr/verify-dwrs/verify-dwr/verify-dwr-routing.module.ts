import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyDwrPage } from './verify-dwr.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyDwrPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyDwrPageRoutingModule {}
