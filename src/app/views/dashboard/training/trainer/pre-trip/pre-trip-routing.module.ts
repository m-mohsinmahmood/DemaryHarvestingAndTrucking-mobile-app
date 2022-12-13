import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreTripPage } from './pre-trip.page';

const routes: Routes = [
  {
    path: '',
    component: PreTripPage
  },  {
    path: 'digital-form',
    loadChildren: () => import('./digital-form/digital-form.module').then( m => m.DigitalFormPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreTripPageRoutingModule {}
