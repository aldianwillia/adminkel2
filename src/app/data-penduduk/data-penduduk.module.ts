import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataPendudukPageRoutingModule } from './data-penduduk-routing.module';

import { DataPendudukPage } from './data-penduduk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataPendudukPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DataPendudukPage]
})
export class DataPendudukPageModule {}
