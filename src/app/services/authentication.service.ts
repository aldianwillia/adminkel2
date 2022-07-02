import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, pipe } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ComponentService } from './component.service';
import { Storage } from '@capacitor/storage';
import { JwtHelperService } from '@auth0/angular-jwt';

export const ACCESS_TOKEN_KEY = 'access-token';
export const ACCESS_USER = 'access-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  api_auth = environment.API_AUTH;
  currentAccessToken = null;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);


  constructor(private http: HttpClient,
              private compService: ComponentService,
              private router: Router
              ) {
                this.checkToken();
              }

  checkToken() {
    Storage.get({key: ACCESS_TOKEN_KEY}).then(token => {
      if(token.value) {
        this.isAuthenticated.next(true);
        // let isExpired = this.jwtHelper.isTokenExpired(token.value);

        // if(!isExpired){
        //   this.isAuthenticated.next(true);
        // } else {
        //   Storage.remove({key: ACCESS_TOKEN_KEY});
        //   this.isAuthenticated.next(false);
        // }
      }else {
        this.isAuthenticated.next(false);
      }
    })
  }

  login(user){
    // console.log('user:', user);

    return this.http.post(`${this.api_auth}/login`, user).pipe(
      tap(res=>{
        if(res['status']){
          //simpan token
          console.log(res['message']);
          this.currentAccessToken = res['access_token'];
          this.isAuthenticated.next(true);
          this.setToken(this.currentAccessToken);
          this.getUser()
          this.compService.stopLoader();

          // this.router.navigate(['/home'], {replaceUrl:true});
        } else {
          this.isAuthenticated.next(false)
          this.compService.stopLoader();
          this.compService.presentAlert('Gagal', res['message']);
        }
      }),
      catchError(e =>{
        this.compService.stopLoader();
        this.compService.presentAlert('Error', e.message)
        console.log(e);
        throw new Error()
      })
    );

  }

  registerUser(requestRegister){
    this.compService.startLoader('Sedang Meregistrasi')

    this.http.post(`${this.api_auth}/register`,requestRegister).pipe(
      tap(res=>{
          if(res['status']){
            this.compService.stopLoader()
            this.compService.presentAlert('Berhasil Registrasi', res['message']);
            this.router.navigate(['/login'], {replaceUrl:true});

          }else{
            this.compService.stopLoader()
            this.compService.presentAlert('Gagal Meregistrasi', res['message']);
          }
        }),
        catchError(e=>{
          this.compService.stopLoader()
          this.compService.presentAlert('Error',e.message)
          throw new Error();
      })
    ).subscribe();
    
  }
  
  async logout () {
     const token = await Storage.get({key: ACCESS_TOKEN_KEY});

     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token.value}`
       })
     }

     return this.http.post(`${this.api_auth}/logout`, {}, httpOptions).pipe(
       tap(_ => {
         this.currentAccessToken = null;
         Storage.remove({key: ACCESS_TOKEN_KEY});
         Storage.remove({key:ACCESS_USER});
         this.isAuthenticated.next(false);
       })
     ).toPromise();

  }

  async setToken(token){
    await Storage.set({
      key: ACCESS_TOKEN_KEY,
      value: token
    })
  }

  // async setUser(user){
  //   await Storage.set({
  //     key: ACCESS_USER,
  //     value: user
  //   })
  // }

  async getUser(){
    const token = await Storage.get({key: ACCESS_TOKEN_KEY});

     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token.value}`
       })
     }

    this.http.post(`${this.api_auth}/me`, {}, httpOptions).pipe(
      tap(res => {
        const data = res['data'] 
        const userStorage = JSON.stringify({
          name: data.name,
          email: data.email,
          nik:data.nik,
          id_kel_desa: data.id_kel_desa,
          role: data.roleuser.roleid.slug
        }) 
          
        //set user ke storage
          Storage.set({
            key: ACCESS_USER,
            value: userStorage
          })

          this.router.navigate(['/home'], {replaceUrl:true});
      
      }),
      catchError(e => {
        throw new Error();
      })
    ).subscribe()
  }
}
