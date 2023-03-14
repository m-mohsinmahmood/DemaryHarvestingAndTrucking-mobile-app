import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TruckingPage } from './trucking.page';

const routes: Routes = [
  {
    path: '',
    component: TruckingPage
  },
  {
    path: 'in-house',
    loadChildren: () => import('./in-house/in-house.module').then( m => m.InHousePageModule)
  },
  {
    path: 'commercial',
    loadChildren: () => import('./commercial/commercial.module').then( m => m.CommercialPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TruckingPageRoutingModule {}
