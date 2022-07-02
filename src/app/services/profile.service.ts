import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './authentication.service';
import { ComponentService } from './component.service';
import { Storage } from '@capacitor/storage';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  api_auth = environment.API_AUTH
  token:String ='';

  constructor(private http:HttpClient,
              private compService:ComponentService,
              private router: Router) { }

             getdatauser(){
               Storage.get({key:ACCESS_TOKEN_KEY}).then(token => {
                 if(token.value){
                  this.token = token.value
                 }
               })
               const httpOptions = {
                Headers: new HttpHeaders({
                  'content-Type': 'application/json',
                  Authorzation: `Bearer ${this.token}`
                })
              }
              
              return this.http.post(`${this.api_auth}/getprofileUser`, httpOptions)
             }
}
