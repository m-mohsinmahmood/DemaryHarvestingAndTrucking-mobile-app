/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'harvesting',
    loadChildren: () => import('./harvesting/harvesting.module').then(m => m.HarvestingPageModule)
  },
  {
    path: 'farming',
    loadChildren: () => import('./farming/farming.module').then(m => m.FarmingPageModule)
  },
  {
    path: 'others',
    loadChildren: () => import('./others/others.module').then(m => m.OthersPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
