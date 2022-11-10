import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DwrPage } from './dwr.page';

const routes: Routes = [
  {
    path: '',
    component: DwrPage
  },
  {
    path: 'verify-dwrs',
    loadChildren: () => import('./verify-dwrs/verify-dwrs.module').then( m => m.VerifyDwrsPageModule)
  },
  {
    path: 'work-history',
    loadChildren: () => import('./work-history/work-history.module').then( m => m.WorkHistoryPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DwrPageRoutingModule {}
