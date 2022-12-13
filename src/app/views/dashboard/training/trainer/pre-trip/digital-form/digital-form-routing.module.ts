import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalFormPage } from './digital-form.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalFormPageRoutingModule {}
