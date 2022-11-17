import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PreTripCategoriesPageRoutingModule } from './pre-trip-categories-routing.module';
import { PreTripCategoriesPage } from './pre-trip-categories.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreTripCategoriesPageRoutingModule,
    HeaderModule
  ],
  declarations: [PreTripCategoriesPage]
})
export class PreTripCategoriesPageModule { }
