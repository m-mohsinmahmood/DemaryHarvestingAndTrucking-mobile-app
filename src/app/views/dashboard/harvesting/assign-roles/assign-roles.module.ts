import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignRolesPageRoutingModule } from './assign-roles-routing.module';

import { AssignRolesPage } from './assign-roles.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    AssignRolesPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [AssignRolesPage]
})
export class AssignRolesPageModule {}
