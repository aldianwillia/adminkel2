import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { ComponentService } from '../services/component.service';
import { SuratumumService } from '../services/suratumum.service';
import { Storage } from '@capacitor/storage';
import { ACCESS_USER } from '../services/authentication.service';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.page.html',
  styleUrls: ['./view-pdf.page.scss'],
})
export class ViewPDFPage implements OnInit {

  viewpdf: any = {};
  user: any = {};
  externalLink: any ;

  constructor(public navCrtl: NavController,
    public api: AuthServiceService,
    public suratumumservice: SuratumumService,
    private comservice: ComponentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getdocument();
  }

  getUser() {
    Storage.get({ key: ACCESS_USER }).then(data => {
      this.user = JSON.parse(data.value);
      console.log(this.user)
    })
  }

  getdocument(){


    Storage.get({key: ACCESS_USER}).then(data => {
      this.user = JSON.parse(data.value)
      const id = this.route.snapshot.params.id;
      this.suratumumservice.FileSingleSurat(id).pipe(
        tap(res => {
          if (res['status']) {
            this.viewpdf = res['data']
            const url = 'http://login-app.com/dokumen/'+this.viewpdf.document+'.pdf'
            console.log(url);
            
            this.externalLink = this.sanitizer.bypassSecurityTrustResourceUrl(url)
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
