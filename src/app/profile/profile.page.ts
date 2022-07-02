import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ComponentService } from '../services/component.service';
import { AuthServiceService } from './../../app/auth-service.service';
import { ACCESS_USER } from '../services/authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';
import { ProfileService } from '../services/profile.service';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:any={}
  profileuser;

  public FormDataUser: FormGroup;

  constructor(
    public navCtrl:NavController,
    public api: AuthServiceService,
    public formBuilder: FormBuilder,
    private comservis: ComponentService,
    public profileservis: ProfileService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.FormDataUser = this.formBuilder.group({
     
      nik: ['', [Validators.required]],
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      id_kel_desa: ['',[Validators.required]],
      
    })
    this.getdatauser();
    this.getUser();
  }

  getdatauser(){
    this.profileservis.getdatauser().pipe(
      tap(res=>{
        if(res['status']){
          this.profileuser = res['jabatan']
        }
        else{
          this.comservis.presentAlert('gagal', 'data tidak ada')
        }
      }),
      catchError(e => {
        this.comservis.presentAlert('error', e.message)
        throw new Error(e.message);
      })
    ).subscribe
  }

  async getUser(){

    const user_storage = await Storage.get({key:ACCESS_USER});

    this.user = JSON.parse(user_storage.value); 
    this.FormDataUser.get('nik').setValue(this.user.nik);

    // Storage.get({key:ACCESS_USER}).then(data=>{
    //   this.user = JSON.parse(data.value)
    //   this.FormDataUser.get('nik').setValue(this.user.nik);
    //   console.log(this.user)
    // })
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: DepositModalComponent
    });
    await modal.present();
  }

}
