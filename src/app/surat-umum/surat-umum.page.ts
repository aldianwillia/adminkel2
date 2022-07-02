import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { AuthServiceService } from './../../app/auth-service.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ACCESS_USER } from '../services/authentication.service';
import { Storage } from '@capacitor/storage';
import { SuratumumService } from '../services/suratumum.service';
import { catchError, tap } from 'rxjs/operators';
import { ComponentService } from '../services/component.service';

@Component({
  selector: 'app-surat-umum',
  templateUrl: './surat-umum.page.html',
  styleUrls: ['./surat-umum.page.scss'],
})
export class SuratUmumPage implements OnInit {

  klasifikasi:any;

  user:any={}
  jabatan;
  jsurat;
  

  public FormSuratUmum: FormGroup;

  constructor(
    public navCtrl: NavController,
    public api: AuthServiceService,
    public loadCtrl:LoadingController,
    public formBuilder: FormBuilder,
    public suratumumservis : SuratumumService,
    private comservis : ComponentService
    ) {}


  ngOnInit() {

    this.FormSuratUmum = this.formBuilder.group({
      nik: ['', [Validators.required]],
      kode_surat: ['',[Validators.required]],
      alasan: ['',[Validators.required]],
      tujuan: ['',[Validators.required]],
      tanggal_surat: ['',[Validators.required]],
    })

    this.getUser();
    this.getJabatan();
    this.getSurat();
  }


  klas_surat() {
    this.klasifikasi = this.api.Get_Data('klas_surat');
  }

  getUser(){
    Storage.get({key:ACCESS_USER}).then(data=>{
      this.user = JSON.parse(data.value);

      this.FormSuratUmum.get('nik').setValue(this.user.nik);
      console.log(this.user)
    })
  }
  
  getJabatan(){
   this.suratumumservis.getjabatan().pipe(
     tap(res=>{

       if(res['status']){
         this.jabatan = res['jabatan']
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

   submitsurat(){
     console.log(this.FormSuratUmum.value)
     this.suratumumservis.submitsurat(this.FormSuratUmum.value)
   }
}
