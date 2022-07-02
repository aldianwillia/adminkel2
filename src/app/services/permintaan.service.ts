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
export class PermintaanService {

  api_auth = environment.API_AUTH
  token:String = ''

  constructor(private http:HttpClient,
   ) { }

    Suratkepejabat(nik){
      Storage.get({key:ACCESS_TOKEN_KEY}).then(token => {
        if(token.value){
          this.token = token.value
        }
      })
      const httpOptions:object = {
        Headers: new HttpHeaders({
          'content-Type': 'application/json',
          Authorzation: `Bearer ${this.token}`
        })
      }
      const body = {
        nik:nik
      }
      return this.http.post(`${this.api_auth}/suratkepejabat`, body, httpOptions)
    }
}
