import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'crew-tasks',
    loadChildren: () => import('./harvesting/crew-tasks/crew-tasks.module').then(m => m.CrewTasksPageModule)
  },
  {
    path: 'combine-operator-tasks',
    loadChildren: () => import('./harvesting/combine-operator-tasks/combine-operator-tasks.module').then(m => m.CombineOperatorTasksPageModule)
  },
  {
    path: 'kart-operator-tasks',
    loadChildren: () => import('./harvesting/kart-operator-tasks/kart-operator-tasks.module').then(m => m.KartOperatorTasksPageModule)
  },
  {
    path: 'truck-driver-tasks',
    loadChildren: () => import('./harvesting/truck-driver-tasks/truck-driver-tasks.module').then(m => m.TruckDriverTasksPageModule)
  },
  {
    path: 'dispatcher',
    loadChildren: () => import('./farming/dispatcher/dispatcher.module').then(m => m.DispatcherPageModule)
  },
  {
    path: 'tractor-driver',
    loadChildren: () => import('./farming/tractor-driver/tractor-driver.module').then(m => m.TractorDriverPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
