import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { AuthServiceService } from './../../app/auth-service.service';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ACCESS_USER } from '../services/authentication.service';
import { Storage } from '@capacitor/storage';
import { SuratumumService } from '../services/suratumum.service';
import { catchError, tap } from 'rxjs/operators';
import { ComponentService } from '../services/component.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
