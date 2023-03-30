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
  {
    path: 'dwr',
    loadChildren: () => import('./dwr/dwr.module').then( m => m.DwrPageModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then( m => m.TrainingPageModule)
  },
  {
    path: 'trucking',
    loadChildren: () => import('./trucking/trucking.module').then( m => m.TruckingPageModule)
  },
  {
    path: 'maintenance-repair',
    loadChildren: () => import('./maintenance-repair/maintenance-repair.module').then( m => m.MaintenanceRepairPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
