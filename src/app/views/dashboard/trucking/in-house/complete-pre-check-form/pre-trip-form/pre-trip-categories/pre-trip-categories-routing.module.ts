import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreTripCategoriesPage } from './pre-trip-categories.page';

const routes: Routes = [
  {
    path: '',
    component: PreTripCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreTripCategoriesPageRoutingModule {}
