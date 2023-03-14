import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InCabPage } from './in-cab.page';

const routes: Routes = [
  {
    path: '',
    component: InCabPage
  },
  {
    path: 'vehicle-external',
    loadChildren: () => import('./vehicle-external/vehicle-external.module').then( m => m.VehicleExternalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InCabPageRoutingModule {}
