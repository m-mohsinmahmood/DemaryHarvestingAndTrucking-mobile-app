import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingRecordsPage } from './training-records.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingRecordsPage
  },
  {
    path: 'search-records',
    loadChildren: () => import('./search-records/search-records.module').then( m => m.SearchRecordsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRecordsPageRoutingModule {}
