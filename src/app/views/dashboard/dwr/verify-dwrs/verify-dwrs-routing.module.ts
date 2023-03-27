import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyDwrsPage } from './verify-dwrs.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyDwrsPage
  },
  {
    path: 'verify-dwr',
    loadChildren: () => import('./verify-dwr/verify-dwr.module').then( m => m.VerifyDwrPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyDwrsPageRoutingModule {}
