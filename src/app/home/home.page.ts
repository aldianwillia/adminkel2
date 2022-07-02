import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ACCESS_USER, AuthenticationService } from '../services/authentication.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  user:any={};

  constructor(private authService:AuthenticationService,
              private router: Router) {
                this.getUser();
              }
  
  ngOnInit(){
    
  }

  

  async getUser(){

    var user_mentah = await Storage.get({key:ACCESS_USER});
    var user = JSON.parse(user_mentah.value);
    this.user = user

    console.log(this.user);
    
  }
}
