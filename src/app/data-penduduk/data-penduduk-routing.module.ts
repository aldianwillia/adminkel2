import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataPendudukPage } from './data-penduduk.page';

const routes: Routes = [
  {
    path: '',
    component: DataPendudukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataPendudukPageRoutingModule {}
