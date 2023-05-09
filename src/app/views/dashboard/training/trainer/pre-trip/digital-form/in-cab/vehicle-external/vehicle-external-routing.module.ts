import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleExternalPage } from './vehicle-external.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleExternalPage
  },  {
    path: 'coupling',
    loadChildren: () => import('./coupling/coupling.module').then( m => m.CouplingPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleExternalPageRoutingModule {}
