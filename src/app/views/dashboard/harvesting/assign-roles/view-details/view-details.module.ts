import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDetailsPageRoutingModule } from './view-details-routing.module';

import { ViewDetailsPage } from './view-details.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDetailsPageRoutingModule,
    HeaderModule,
    ReactiveFormsModule,
  ],
  declarations: [ViewDetailsPage,WithLoadingPipe]
})
export class ViewDetailsPageModule {}
