import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingBlindPage } from './parking-blind.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingBlindPage
  },
  {
    path: 'parking-sight',
    loadChildren: () => import('./parking-sight/parking-sight.module').then( m => m.ParkingSightPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingBlindPageRoutingModule {}
