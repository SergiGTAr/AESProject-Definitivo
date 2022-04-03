import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [UserService]
})

export class SigninComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    
  }

  onSubmit() {
    console.log(this.userService.login());
    console.log('Login');
  }

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
}
