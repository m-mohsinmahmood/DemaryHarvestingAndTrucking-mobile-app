import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyOrdersPage } from './verify-orders.page';
import { OrderDetailPage } from './order-detail/order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyOrdersPage
  },

  {
    path: 'order-detail',
    component: OrderDetailPage
  },  {
    path: 'dummy',
    loadChildren: () => import('./dummy/dummy.module').then( m => m.DummyPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyOrdersPageRoutingModule { }
