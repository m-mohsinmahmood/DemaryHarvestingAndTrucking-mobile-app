import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngineCheckPage } from './engine-check.page';

const routes: Routes = [
  {
    path: '',
    component: EngineCheckPage
  },
  {
    path: 'in-cab',
    // loadChildren: () => import('./in-cab/in-cab.module').then( m => m.InCabPageModule)
    loadChildren: () => import('../in-cab/in-cab.module').then( m => m.InCabPageModule)

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineCheckPageRoutingModule {}
