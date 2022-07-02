import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPengajuanPage } from './list-pengajuan.page';

const routes: Routes = [
  {
    path: '',
    component: ListPengajuanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPengajuanPageRoutingModule {}
