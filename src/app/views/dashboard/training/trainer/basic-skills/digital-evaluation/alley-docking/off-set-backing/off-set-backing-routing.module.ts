import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffSetBackingPage } from './off-set-backing.page';

const routes: Routes = [
  {
    path: '',
    component: OffSetBackingPage
  },
  {
    path: 'parking-blind',
    loadChildren: () => import('./parking-blind/parking-blind.module').then( m => m.ParkingBlindPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffSetBackingPageRoutingModule {}
