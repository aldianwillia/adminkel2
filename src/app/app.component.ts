import { Component } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { AuthServiceService } from '../app/auth-service.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ACCESS_USER } from '../app/services/authentication.service';
import { Storage } from '@capacitor/storage';
import { SuratumumService } from '../app/services/suratumum.service';
import { catchError, tap } from 'rxjs/operators';
import { ComponentService } from '../app/services/component.service'
import { AuthenticationService } from '../app/services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';
import { from } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user:any={}

  constructor(  public navCtrl: NavController,
                public api: AuthServiceService,
                private authService:AuthenticationService,
                private router: Router) {}

                ngOnInit() {
                  this.getUser();
                }


                getUser(){
                  Storage.get({key:ACCESS_USER}).then(data=>{
                    this.user = JSON.parse(data.value);
                    console.log(this.user)
                  })
                }
                
                logoutAccount(){
                  from(this.authService.logout()).pipe(
                    tap(res=> {
                      this.router.navigate(['/login', {replaceUrl: true}]);
                    }),
                    catchError(e=>{
                      throw new Error(e.message);
                    })
                  ).subscribe();
               }
}
