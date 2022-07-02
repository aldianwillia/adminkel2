import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPermintaanPageRoutingModule } from './list-permintaan-routing.module';

import { ListPermintaanPage } from './list-permintaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPermintaanPageRoutingModule
  ],
  declarations: [ListPermintaanPage]
})
export class ListPermintaanPageModule {}
