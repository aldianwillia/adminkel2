import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private alert: AlertController,
              private loadingCtrl: LoadingController) { }

  async presentAlert(header, message) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async startLoader(message) {
    let loading = this.loadingCtrl.create({
      message: message
    }).then((res)=> {
      res.present();

      res.onDidDismiss().then((dis) => {

      });

    });
  }

  stopLoader(){
    this.loadingCtrl.dismiss();
  }

}
