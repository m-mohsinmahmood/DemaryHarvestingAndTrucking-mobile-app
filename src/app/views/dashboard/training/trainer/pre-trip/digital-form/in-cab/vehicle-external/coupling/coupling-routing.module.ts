import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouplingPage } from './coupling.page';

const routes: Routes = [
  {
    path: '',
    component: CouplingPage
  },
  {
    path: 'suspension-brakes',
    loadChildren: () => import('./suspension-brakes/suspension-brakes.module').then( m => m.SuspensionBrakesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouplingPageRoutingModule {}
