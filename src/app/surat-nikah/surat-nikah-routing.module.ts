import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuratNikahPage } from './surat-nikah.page';

const routes: Routes = [
  {
    path: '',
    component: SuratNikahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuratNikahPageRoutingModule {}
