import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPermintaanPage } from './list-permintaan.page';

const routes: Routes = [
  {
    path: '',
    component: ListPermintaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPermintaanPageRoutingModule {}
