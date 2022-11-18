import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletePreCheckFormPage } from './complete-pre-check-form.page';

const routes: Routes = [
  {
    path: '',
    component: CompletePreCheckFormPage
  },
  {
    path: 'pre-trip-form',
    loadChildren: () => import('./pre-trip-form/pre-trip-form.module').then(m => m.PreTripFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletePreCheckFormPageRoutingModule { }
