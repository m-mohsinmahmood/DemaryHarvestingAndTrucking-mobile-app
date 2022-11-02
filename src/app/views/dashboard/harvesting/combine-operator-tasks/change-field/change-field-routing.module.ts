import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeFieldPage } from './change-field.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeFieldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeFieldPageRoutingModule {}
