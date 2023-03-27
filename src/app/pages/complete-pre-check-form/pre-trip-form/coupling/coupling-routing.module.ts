import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouplingPage } from './coupling.page';

const routes: Routes = [
  {
    path: '',
    component: CouplingPage
  },
  {
    path: 'trailer',
    loadChildren: () => import('../trailer/trailer.module').then( m => m.TrailerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouplingPageRoutingModule {}
