import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { ComponentService } from '../services/component.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  user:FormGroup;
  api_auth = environment.API_AUTH;
  token;

  constructor(private fb:FormBuilder,
              private authService: AuthenticationService,
              private compService: ComponentService,
              private menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  } 

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.min(8)]]
    })
  }

  submitLogin(){
    //loader
    this.compService.startLoader('Tunggu Sebentar');
    //panggil servis method login
    this.authService.login(this.user.value).subscribe();
  }
 
}
