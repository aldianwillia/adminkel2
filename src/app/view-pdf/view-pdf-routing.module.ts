import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPDFPage } from './view-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPDFPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPDFPageRoutingModule {}
