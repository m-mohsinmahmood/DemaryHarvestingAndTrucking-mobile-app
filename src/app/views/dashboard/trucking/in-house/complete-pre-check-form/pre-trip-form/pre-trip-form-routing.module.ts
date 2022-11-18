import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreTripFormPage } from './pre-trip-form.page';

const routes: Routes = [
  {
    path: '',
    component: PreTripFormPage
  },
  {
    path: 'pre-trip-categories',
    loadChildren: () => import('./pre-trip-categories/pre-trip-categories.module').then( m => m.PreTripCategoriesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreTripFormPageRoutingModule {}
