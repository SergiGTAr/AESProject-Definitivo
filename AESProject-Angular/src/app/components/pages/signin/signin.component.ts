import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserModel} from '../../../models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [UserService]
})

export class SigninComponent implements OnInit {
    public user: UserModel;
    public status: string;
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(private userService: UserService) {
      this.user = new UserModel('', '', '', '', '', '');
  }

  ngOnInit() {
        console.log('Component de login inicialitzat');
  }

  onSubmit() {
    this.user = new UserModel("", "", "", "",
      this.email.value, this.password.value);
    this.userService.login(this.user).subscribe(
        response => {
            console.log(response.user);
            this.status = 'success';
        },
        error => {
            const errorMessage = error as any;
            console.log(errorMessage);
            if (errorMessage != null){
                this.status = 'error';
            }
        }
    );
  }

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
}
