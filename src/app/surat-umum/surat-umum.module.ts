import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SuratUmumPageRoutingModule } from './surat-umum-routing.module';
import { SuratUmumPage } from './surat-umum.page';
import { ComponentsModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SuratUmumPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SuratUmumPage]
})
export class SuratUmumPageModule {}
