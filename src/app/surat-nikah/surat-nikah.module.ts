import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SuratNikahPageRoutingModule } from './surat-nikah-routing.module';
import { SuratNikahPage } from './surat-nikah.page';
import { ComponentsModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuratNikahPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [SuratNikahPage]
})
export class SuratNikahPageModule {}
