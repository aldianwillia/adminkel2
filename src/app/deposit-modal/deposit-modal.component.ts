import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
})
export class DepositModalComponent implements OnInit {

  public pic: any;

  constructor(private modalCtrl: ModalController,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit() {}

  ionViewDidLoad(){
    console.log('ionViewDidLoad Upload');
    
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  

}
