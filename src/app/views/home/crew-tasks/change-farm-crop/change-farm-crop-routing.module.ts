import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeFarmCropPage } from './change-farm-crop.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeFarmCropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeFarmCropPageRoutingModule {}
