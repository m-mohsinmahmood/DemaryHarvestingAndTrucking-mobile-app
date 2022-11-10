import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignRolesPageRoutingModule } from './assign-roles-routing.module';

import { AssignRolesPage } from './assign-roles.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    AssignRolesPageRoutingModule,
    HeaderModule
  ],
  declarations: [AssignRolesPage]
})
export class AssignRolesPageModule {}
