import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPengajuanPageRoutingModule } from './list-pengajuan-routing.module';

import { ListPengajuanPage } from './list-pengajuan.page';

import { ComponentsModule } from '../components/component.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPengajuanPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListPengajuanPage]
})
export class ListPengajuanPageModule {}
