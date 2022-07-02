import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { ComponentService } from './component.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';
import { ACCESS_TOKEN_KEY } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuratnikahService {

  api_auth = environment.API_AUTH;
  token = '';

  constructor(private http:HttpClient,
              private compService:ComponentService,
              private router: Router) { }


              getsuratnikah(nik_calon){
                Storage.get({key:ACCESS_TOKEN_KEY}).then(token =>{
                  if(token.value){
                    this.token = token.value
                  }
                })
                const httpOptions:object = {
                  Headers: new HttpHeaders({
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${this.token}`
                  })
                }
                const body = {
                  nik:nik_calon
                }
                return this.http.post(`${this.api_auth}/getdatasuratnikah`,body,httpOptions)
              }
          


              getdetapenduduk(){
                Storage.get({key:ACCESS_TOKEN_KEY}).then(token =>{
                  if(token.value){
                    this.token = token.value
                  }
                })
                const httpOptions = {
                  Headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                  })
                }
                return this.http.post(`${this.api_auth}/getdata_penduduk`, httpOptions)
              }

              getdatasurat(){
                Storage.get({key:ACCESS_TOKEN_KEY}).then(token =>{
                  if(token.value){
                    this.token = token.value
                  }
                })
                const httpOptions:object = {
                  Headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                  })
                }
                return this.http.post(`${this.api_auth}/data_suratn`, httpOptions)
              }
            
              getnikortulaki(nik){

                Storage.get({key:ACCESS_TOKEN_KEY}).then(token =>{
                  if(token.value){
                    this.token = token.value
                  }
                })
                
                
                const httpOptions:object = {
                  Headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                  })
                }

                const data = {
                  nik: nik
                }

                return this.http.post(`${this.api_auth}/getnik_ortulaki`, data, httpOptions)
              }

              getnikortupere(nik){
                Storage.get({key:ACCESS_TOKEN_KEY}).then(token =>{
                  if(token.value){
                    this.token = token.value
                  }
                })
                const httpOptions:object = {
                  Headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                  })
                }

                const data = {
                  nik: nik
                }

                return this.http.post(`${this.api_auth}/getnik_ortupere`, data, httpOptions)
              }

              getsurat(){

                Storage.get({key:ACCESS_TOKEN_KEY}).then(token => {
                  if(token.value){
                    this.token = token.value
                  }
          
                })
          
                const httpOptions = {
                  Headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                  })
                }
          
                return this.http.post(`${this.api_auth}/surat_nikah`, httpOptions)
                
               }

              submitsuratnikah(requessuratumum){
                this.compService.startLoader('Sedang menyimpan data')
                
                Storage.get({key:ACCESS_TOKEN_KEY}).then(token => {
                  if(token.value){
                    this.token=token.value
                  }
                })
                const httpOptions ={
                  Headers: new HttpHeaders({
                    'conten-Type' : 'application/json',
                    Authorization: `Bearer ${this.token}`
                  })
                }
                this.http.post(`${this.api_auth}/submit_surat_nikah`,requessuratumum).pipe(
                  tap(res=>{
                    if(res['status']){
                      this.compService.stopLoader()
                      this.compService.presentAlert('Berhasil Disimpan', res['message']);
                      this.router.navigate(['/home'], {replaceUrl:true});
                    }else{
                      this.compService.stopLoader()
                      this.compService.presentAlert('Gagal Menyimpan', res['message']);
                    }
                  }),
                  catchError(e=>{
                    this.compService.stopLoader()
                    this.compService.presentAlert('Error',e.message)
                    throw new Error();
                  })
                ).subscribe()
               }

}
