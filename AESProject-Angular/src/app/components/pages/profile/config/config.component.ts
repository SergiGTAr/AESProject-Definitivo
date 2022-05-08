import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  namesForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)]),
    surname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)])
  });
  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]),
    repeatedPassword: new FormControl('', [Validators.required])
  }, CustomValidators.mustMatch('password','repeatedPassword'));
  infoForm = new FormGroup({
    biography: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]),
    day: new FormControl('', [Validators.required]),
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required])
  });
  

  constructor() { }


  ngOnInit(): void {
  
  }

  saveNames() {

  }

  savePassword() {
    
  }

  saveInfo() {
    
  }

  get name() {
    return this.namesForm.get('name');
  }

  get surname() {
    return this.namesForm.get('surname');
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get repeatedPassword() {
    return this.passwordForm.get('repeatedPassword');
  }

  get day() {
    return this.infoForm.get('day');
  }

  get month() {
    return this.infoForm.get('month');
  }

  get year() {
    return this.infoForm.get('year');
  }
}

class CustomValidators {
  constructor() {}

  static mustMatch(password: string, repeatedPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[repeatedPassword];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}