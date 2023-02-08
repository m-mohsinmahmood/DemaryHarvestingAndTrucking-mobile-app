import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConfirmModelComponent } from './confirm-model.component';

@NgModule({
    declarations: [
      ConfirmModelComponent
    ],
    imports     : [
    CommonModule,
    IonicModule,

    ],
    exports     : [
      ConfirmModelComponent
    ]
})
export class HeaderModule
{
}
