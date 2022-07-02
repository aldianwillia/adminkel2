import { Component, OnInit } from '@angular/core';
import { ACCESS_TOKEN_KEY, ACCESS_USER } from '../services/authentication.service';
import { Storage } from '@capacitor/storage';
import { SuratumumService } from '../services/suratumum.service';
import { catchError, tap } from 'rxjs/operators';
import { ComponentService } from '../services/component.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { SuratnikahService } from '../services/suratnikah.service';
import { DocumentViewer, DocumentViewerOptions, DocumentViewerOriginal } from '@ionic-native/document-viewer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pengajuan',
  templateUrl: './list-pengajuan.page.html',
  styleUrls: ['./list-pengajuan.page.scss'],
})
export class ListPengajuanPage implements OnInit {

  datasuratumum;
  datasuratnikah;
  jsurat;
  filePDF;
  user: any = {};

  private selectedSegment: string = 'listsurat || listsuratselesai'
  

  constructor(public navCtrl: NavController,
    public api: AuthServiceService,
    public loadCtrl: LoadingController,
    public suratumumservis: SuratumumService,
    public suratnikahservice: SuratnikahService,
    private comservis: ComponentService,
    private router: Router) { }

  ngOnInit() {
    this.getsuratumum();
    // this.getsuratnikah();
    this.suratdisetujui();
    this.getSurat();
  }

  getUser() {
    Storage.get({ key: ACCESS_USER }).then(data => {
      this.user = JSON.parse(data.value);
      console.log(this.user)
    })
  }

  segmentChanged(event: any) {
    console.log(event.target.value)
    this.selectedSegment = event.target.value
  }

  openDocument(id){
    this.router.navigateByUrl('/view-pdf/'+id,{replaceUrl:true})
  }

  getsuratnikah(){
    Storage.get({key:ACCESS_USER}).then(data => {
      this.user = JSON.parse(data.value)
      const nik = this.user.nik
      this.suratnikahservice.getsuratnikah(nik).pipe(
        tap(res => {
          if(res['status']){
            this.datasuratnikah = res['data']
          }
          else {
            this.comservis.presentAlert('Error', 'data tidak ada')
          }
        }),
        catchError(e => {
          this.comservis.presentAlert('Error', e.message)
          throw new Error(e.message)
        })
      ).subscribe()
    })
  }

  suratdisetujui(){
    Storage.get({ key: ACCESS_USER }).then(data => {
      this.user = JSON.parse(data.value);
      const nik = this.user.nik
      this.suratumumservis.Filesurat(nik).pipe(
        tap(res => {
          if (res['status']) {
            this.filePDF = res['data']
          }
          else {
            this.comservis.presentAlert('Error', 'data tidak ada')
          }
        }),
        catchError(e => {
          this.comservis.presentAlert('Error', e.message)
          throw new Error(e.message)
        })
      ).subscribe()
    })
  }

  getsuratumum() {
    Storage.get({ key: ACCESS_USER }).then(data => {
      this.user = JSON.parse(data.value);
      const nik = this.user.nik
      this.suratumumservis.getsuratumum(nik).pipe(
        tap(res => {
          if (res['status']) {
            this.datasuratumum = res['data']
          }
          else {
            this.comservis.presentAlert('Error', 'data tidak ada')
          }
        }),
        catchError(e => {
          this.comservis.presentAlert('Error', e.message)
          throw new Error(e.message)
        })
      ).subscribe()
    })
  }

  getSurat(){
    this.suratumumservis.getsurat().pipe(
      tap(res=>{
 
        if(res['status']){
          this.jsurat = res['kode_surat']
        }
        else{
          this.comservis.presentAlert('gagal' , 'data tidak tersedia');
        }
       
      }),
      catchError(e => {
        this.comservis.presentAlert('error', e.message)
        throw new Error(e.message);
        
      })
    ).subscribe();
   }

}
