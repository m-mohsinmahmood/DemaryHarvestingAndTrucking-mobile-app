import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkHistoryPageRoutingModule } from './work-history-routing.module';

import { WorkHistoryPage } from './work-history.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    WorkHistoryPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [WorkHistoryPage, WithLoadingPipe]
})
export class WorkHistoryPageModule {}
