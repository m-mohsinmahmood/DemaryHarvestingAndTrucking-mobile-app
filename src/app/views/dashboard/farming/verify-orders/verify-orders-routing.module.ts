import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyOrdersPage } from './verify-orders.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyOrdersPage
  },
  {
    path: 'order-details',
    loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyOrdersPageRoutingModule { }
