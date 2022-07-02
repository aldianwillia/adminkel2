import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ComponentService } from './component.service';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';
import { ACCESS_TOKEN_KEY } from './authentication.service';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class DataPendudukService {

  api_auth = environment.API_AUTH
  token:String = '';

  constructor(private http:HttpClient,
              private compService:ComponentService,
              private router: Router) { }

  submitpenduduk(requespenduduk){
    this.compService.startLoader('data sedang di input')

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
    return this.http.post(`${this.api_auth}/submit_penduduk`, requespenduduk).pipe(
      tap(res=>{
        if(res['status']){
          this.compService.stopLoader()
          this.compService.presentAlert('Berhasil disimpan', res['message'])
          this.router.navigate(['/home'], {replaceUrl:true})
        }else{
          this.compService.stopLoader()
          this.compService.presentAlert('gagal menyimpan', res['message'])
        }
      }),
      catchError(e => {
        this.compService.stopLoader()
        this,this.compService.presentAlert('Error', e.message)
        throw new Error()
      })
    ).subscribe()
  }
}
