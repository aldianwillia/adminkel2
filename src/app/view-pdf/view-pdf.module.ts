import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewPDFPageRoutingModule } from './view-pdf-routing.module';
import { ViewPDFPage } from './view-pdf.page';
import { ComponentsModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPDFPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViewPDFPage]
})
export class ViewPDFPageModule {}
