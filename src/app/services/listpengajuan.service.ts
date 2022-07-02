import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './authentication.service';
import { ComponentService } from './component.service';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ListpengajuanService {

  api_auth = environment.API_AUTH;
  token:String ='';

  constructor(private http:HttpClient,
              private compService:ComponentService,
              private route: Router) { }


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

datapengajuansaya(nik){
    Storage.get({key:ACCESS_TOKEN_KEY}).then(token => {
      if(token.value){
        this.token = token.value
      }
    })
    const httpOptions:object = {
      Headers: new HttpHeaders({
        'content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    }
    const body = {
      nik:nik
    }
    return this.http.post(`${this.api_auth}/pengajuansaya`,body, httpOptions)
  }
}
