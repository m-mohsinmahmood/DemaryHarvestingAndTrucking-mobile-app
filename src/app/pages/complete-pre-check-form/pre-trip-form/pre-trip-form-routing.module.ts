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
    loadChildren: () => import('./engine-check/engine-check.module').then( m => m.EngineCheckPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreTripFormPageRoutingModule {}
