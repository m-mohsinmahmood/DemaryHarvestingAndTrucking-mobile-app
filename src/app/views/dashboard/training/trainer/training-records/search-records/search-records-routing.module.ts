import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchRecordsPage } from './search-records.page';

const routes: Routes = [
  {
    path: '',
    component: SearchRecordsPage
  },
  {
    path: 'view-records',
    loadChildren: () => import('./view-records/view-records.module').then( m => m.ViewRecordsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRecordsPageRoutingModule {}
