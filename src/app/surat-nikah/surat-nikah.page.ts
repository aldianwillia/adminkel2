import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { AuthServiceService } from './../../app/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACCESS_USER } from '../services/authentication.service';
import { Storage } from '@capacitor/storage';
import { catchError, tap } from 'rxjs/operators';
import { ComponentService } from '../services/component.service';
import { SuratnikahService } from '../services/suratnikah.service';

@Component({
  selector: 'app-surat-nikah',
  templateUrl: './surat-nikah.page.html',
  styleUrls: ['./surat-nikah.page.scss'],
})
export class SuratNikahPage implements OnInit {
  user:any={}
  jsurat;
  jpenduduk;
  datasuratnikah;


  public formsuratnikah: FormGroup

  constructor(public navCtrl: NavController,
              public api: AuthServiceService,
              public loadCtrl:LoadingController,
              public formBuilder: FormBuilder,
              public suranikahservis : SuratnikahService,
              private comservis : ComponentService) { }

  ngOnInit() {
    this.formsuratnikah = this.formBuilder.group({
      nik_calon: ['', [Validators.required]],
      nik_pasangan: ['',[Validators.required]],
      nik_ortulaki: ['',[Validators.required]],
      nik_ortupere: ['',[Validators.required]],
      suku_calon: ['',[Validators.required]],
      suku_pasangan: ['', [Validators.required]],
      nama_mamak: ['',[Validators.required]],
      tmplahir_mamak: ['',[Validators.required]],
      tgllahir_mamak: ['',[Validators.required]],
      negeriasal_mamak: ['',[Validators.required]],
      bangsa_mamak: ['',[Validators.required]],
      kerja_mamak: ['', [Validators.required]],
      alamat_mamak: ['',[Validators.required]],
      kawin_ke: ['',[Validators.required]],
      tgl_nikah: ['',[Validators.required]],
      jam_nikah: ['',[Validators.required]],
      tempat_nikah: ['',[Validators.required]],
      mahar_nikah: ['',[Validators.required]]
    })

    
    this.getdatapenduduk();
    this.getSurat();
    this.getUser();
    
  }

  getUser(){
    Storage.get({key:ACCESS_USER}).then(data=>{
      this.user = JSON.parse(data.value);

      this.formsuratnikah.get('nik_calon').setValue(this.user.nik);

      this.getnikortulaki(this.user.nik).subscribe();
      this.getnikortupere(this.user.nik).subscribe();

      console.log(this.user)
    })
  }

  getdatapenduduk(){
    this.suranikahservis.getdetapenduduk().pipe(
      tap(res => {
        if(res['status']){
          this.jpenduduk = res['data_penduduk']
        }
        else{
          this.comservis.presentAlert('gagal','data tidak tersedia');
        }
      }),
      catchError(e => {
        this.comservis.presentAlert('error', e.message)
        throw new Error(e.message);
      })
    ).subscribe();
  }


  getSurat(){
    this.suranikahservis.getsurat().pipe(
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

  

   getnikortulaki(nik){

      return this.suranikahservis.getnikortulaki(nik).pipe(
        tap(res=>{
          if(res['status']){
            this.formsuratnikah.get('nik_ortulaki').setValue(res['nik_ortulaki'])
          }
          else{
            this.comservis.presentAlert('gagal','data tidak ditemukan');
          }
        }),
        catchError(e => {
          this.comservis.presentAlert('error', e.message)
          throw new Error(e.message)
        })
      )
   }

   getnikortupere(nik){

    return this.suranikahservis.getnikortupere(nik).pipe(
      tap(res=>{
        if(res['status']){
          this.formsuratnikah.get('nik_ortupere').setValue(res['nik_ortupere'])
        }
        else{
          this.comservis.presentAlert('gagal','data tidak ditemukan');
        }
      }),
      catchError(e => {
        this.comservis.presentAlert('error', e.message)
        throw new Error(e.message)
      })
    )
 }


  submitsuratnikah(){
    console.log(this.formsuratnikah.value)
    this.suranikahservis.submitsuratnikah(this.formsuratnikah.value)
  }

}
