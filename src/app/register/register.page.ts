import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user:FormGroup;

  constructor(private fb:FormBuilder,
              private authService:AuthenticationService
              ) { }

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', [Validators.required]],
      nik: ['', [Validators.required, Validators.min(12) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      cpassword: ['', [Validators.required]],
    })
  }

  register(){
      this.authService.registerUser(this.user.value)
  }

}
