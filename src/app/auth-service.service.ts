import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ComponentService } from './services/component.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';

// const apiKey = "1c23f35f954922ea3f5558ddb5d9b66e"
const apiUrl = "http://login-app.test/api";
const ACCESS_USER = 'access-user';
const ACCESS_TOKEN_KEY = 'access-token';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
 
                
export class AuthServiceService {

  api_auth = environment.API_AUTH;
  currentAccessToken = null;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient,
              private compService: ComponentService,
              private router: Router,) { 
                this.checkToken();
              }


  checkToken() {
    Storage.get({key: ACCESS_TOKEN_KEY}).then(token => {
      if(token.value) {
        this.isAuthenticated.next(true);
      }else {
        this.isAuthenticated.next(false);
      }
    })
  }

  Get_Data(type): Observable<any> {
    return this.http.get(`${apiUrl}/${type}`);
  }

  Post_Data(type, credentials): Observable<any>{
    return this.http.post(`${apiUrl}/${type}`, credentials, httpOptions);
  }
}
