import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreTripFormPage } from './pre-trip-form.page';

const routes: Routes = [
  {
    path: '',
    component: PreTripFormPage
  },
  {
    path: 'engine-check',
    loadChildren: () => import('./engine-check/engine-check.module').then(m => m.EngineCheckPageModule)
  },
  {
    path: 'in-cab',
    loadChildren: () => import('./in-cab/in-cab.module').then(m => m.InCabPageModule)
  },
  {
    path: 'vehicle-external',
    loadChildren: () => import('./vehicle-external/vehicle-external.module').then(m => m.VehicleExternalPageModule)
  },
  {
    path: 'coupling',
    loadChildren: () => import('./coupling/coupling.module').then(m => m.CouplingPageModule)
  },
  {
    path: 'trailer',
    loadChildren: () => import('./trailer/trailer.module').then(m => m.TrailerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreTripFormPageRoutingModule { }
