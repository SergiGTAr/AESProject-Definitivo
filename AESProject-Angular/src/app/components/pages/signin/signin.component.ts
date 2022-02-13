import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [LoginService]
})

export class SigninComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  loginService: LoginService

  constructor(loginService:LoginService) {
    this.loginService = loginService
  }

  ngOnInit() {

  }

  login() {
    console.log(this.loginService.login());
    console.log("Login");
  }

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
}
