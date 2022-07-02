import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layanan',
  templateUrl: './layanan.component.html',
  styleUrls: ['./layanan.component.scss'],
})
export class LayananComponent implements OnInit {
  subjects;
  constructor(private router:Router) { }

  ngOnInit() {
    this.subjects = [
      {
        img: 'assets/resume.png',
        name: 'Surat Umum',
        link: '/surat-umum'
      },
      {
        img: 'assets/pengajuansays2.png',
        name: 'Surat Nikah',
        link: '/surat-nikah'
      },
      {
        img: 'assets/listsurat.png',
        name: 'Pengajuan Saya',
        link: '/list-pengajuan' 
      }
      
    ]
  }

  directPage(link){
    this.router.navigateByUrl(link, {replaceUrl:true});
  }
}
