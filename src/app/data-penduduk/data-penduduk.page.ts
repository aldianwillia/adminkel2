import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { AuthServiceService } from './../../app/auth-service.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ComponentService } from '../services/component.service';
import { DataPendudukService } from '../services/data-penduduk.service';

@Component({
  selector: 'app-data-penduduk',
  templateUrl: './data-penduduk.page.html',
  styleUrls: ['./data-penduduk.page.scss'],
})
export class DataPendudukPage implements OnInit {

  public FormPenduduk: FormGroup

  constructor(public navCtrl: NavController,
              public api: AuthServiceService,
              public loadCtrl:LoadingController,
              public formBuilder: FormBuilder,
              public pendudukservice : DataPendudukService,
              private comservis : ComponentService) { }

  ngOnInit() {
    this.FormPenduduk = this.formBuilder.group({
      nik:['',[Validators.required]],
      kk:['',[Validators.required]],
      nama:['',[Validators.required]],
      tmp_lahir:['',[Validators.required]],
      tgl_lahir:['',[Validators.required]],
      jenkel:['',[Validators.required]],
      goldar:['',[Validators.required]],
      agama:['',[Validators.required]],
      stat_hbkel:['',[Validators.required]],
      status_kawin:['',[Validators.required]],
      pendidikan:['',[Validators.required]],
      pekerjaan:['',[Validators.required]],
      nama_ibu:['',[Validators.required]],
      nama_ayah:['',[Validators.required]],
      alamat:['',[Validators.required]],
      rt:['',[Validators.required]],
      rw:['',[Validators.required]],
      kelurahan:['',[Validators.required]],
      kecamatan:['',[Validators.required]],
      kotakab:['',[Validators.required]],
      propinsi:['',[Validators.required]],
      status_pend:['',[Validators.required]],

    })
  }

  submitPenduduk(){
    console.log(this.FormPenduduk.value)
    this.pendudukservice.submitpenduduk(this.FormPenduduk.value)
  }

}
