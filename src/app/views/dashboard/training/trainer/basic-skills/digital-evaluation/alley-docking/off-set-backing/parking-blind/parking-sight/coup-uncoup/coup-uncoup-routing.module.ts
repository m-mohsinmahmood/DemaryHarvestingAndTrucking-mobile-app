import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoupUncoupPage } from './coup-uncoup.page';

const routes: Routes = [
  {
    path: '',
    component: CoupUncoupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoupUncoupPageRoutingModule {}
