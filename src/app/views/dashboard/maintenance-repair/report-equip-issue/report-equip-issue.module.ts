import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReportEquipIssuePageRoutingModule } from './report-equip-issue-routing.module';
import { ReportEquipIssuePage } from './report-equip-issue.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportEquipIssuePageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [ReportEquipIssuePage]
})
export class ReportEquipIssuePageModule { }
