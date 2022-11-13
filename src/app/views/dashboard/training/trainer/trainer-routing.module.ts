import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerPage } from './trainer.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerPage
  },
  {
    path: 'pre-trip',
    loadChildren: () => import('./pre-trip/pre-trip.module').then( m => m.PreTripPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerPageRoutingModule {}
