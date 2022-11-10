import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FuseCardComponent } from '@fuse/components/card/card.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports     : [
    CommonModule,
    IonicModule,

    ],
    exports     : [
      HeaderComponent
    ]
})
export class HeaderModule
{
}
