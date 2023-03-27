import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchRecordsPageRoutingModule } from './search-records-routing.module';

import { SearchRecordsPage } from './search-records.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    SearchRecordsPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [SearchRecordsPage]
})
export class SearchRecordsPageModule {}
