import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'surat-umum',
    loadChildren: () => import('./surat-umum/surat-umum.module').then( m => m.SuratUmumPageModule)
  },
  {
    path: 'surat-nikah',
    loadChildren: () => import('./surat-nikah/surat-nikah.module').then( m => m.SuratNikahPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'data-penduduk',
    loadChildren: () => import('./data-penduduk/data-penduduk.module').then( m => m.DataPendudukPageModule)
  },
  {
    path: 'list-pengajuan',
    loadChildren: () => import('./list-pengajuan/list-pengajuan.module').then( m => m.ListPengajuanPageModule)
  },
  {
    path: 'segments',
    loadChildren: () => import('./segments/segments.module').then( m => m.SegmentsPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'list-permintaan',
    loadChildren: () => import('./list-permintaan/list-permintaan.module').then( m => m.ListPermintaanPageModule)
  },
  {
    path: 'view-pdf/:id',
    loadChildren: () => import('./view-pdf/view-pdf.module').then( m => m.ViewPDFPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
