import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';
import { ACCESS_USER, AuthenticationService } from '../services/authentication.service';
import { ComponentService } from '../services/component.service';
import { PermintaanService } from '../services/permintaan.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-list-permintaan',
  templateUrl: './list-permintaan.page.html',
  styleUrls: ['./list-permintaan.page.scss'],
})
export class ListPermintaanPage implements OnInit {

  permintaan;
  user: any = {}

  constructor(public navCtrl: NavController,
              public api: AuthenticationService,
              public loadCtrl: LoadingController,
              public permintaanservice: PermintaanService,
              private comservice: ComponentService) { }

  ngOnInit() {
    this.getpermintaan()
    this.getUser()
  }

  getUser() {
    Storage.get({ key: ACCESS_USER }).then(data => {
      this.user = JSON.parse(data.value);
      console.log(this.user)
    })
  }
  
  getpermintaan(){
    Storage.get({ key: ACCESS_USER }).then(data => {
      this.user = JSON.parse(data.value);
      const nik = this.user.nik
      this.permintaanservice.Suratkepejabat(nik).pipe(
        tap(res => {
          if (res['status']) {
            this.permintaan = res['data']
          }
          else {
            this.comservice.presentAlert('Error', 'data tidak ada')
          }
        }),
        catchError(e => {
          this.comservice.presentAlert('Error', e.message)
          throw new Error(e.message)
        })
      ).subscribe()
    })
  }
}
