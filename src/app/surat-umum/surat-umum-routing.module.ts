import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuratUmumPage } from './surat-umum.page';

const routes: Routes = [
  {
    path: '',
    component: SuratUmumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuratUmumPageRoutingModule {}
