import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  namesForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z]{1,30}$/)]),
    surname: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z]{1,30}$/)])
  });
  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]),
    repeatedPassword: new FormControl('', [Validators.required])
  }, CustomValidators.mustMatch('password','repeatedPassword'));
  infoForm = new FormGroup({
    biography: new FormControl(''),
    day: new FormControl('', [Validators.pattern(/^(:0[1-9]|1[012])/)]),
    month: new FormControl('', [Validators.pattern(/(?:0[1-9]|1[012])/)]),
    year: new FormControl('', [Validators.pattern(/^[0-9]$/)])
  });

  userModel: UserModel
  status: string
  identity: any

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.userModel = new UserModel(this.identity._id, "", "", "", "", "", "");
    
    this.userModel.name = this.identity.name;
    this.namesForm.get('name').setValue(this.userModel.name);

    this.userModel.surname = this.identity.surname;
    this.namesForm.get('surname').setValue(this.userModel.surname);

    if (this.identity.bio !== undefined) {
      this.userModel.bio = this.identity.bio;
      this.infoForm.get('biography').setValue(this.userModel.bio);
    }

    if (this.identity.birth !== undefined) {
      this.userModel.birth = new Date(this.identity.birth);
      this.infoForm.get('day').setValue(String(this.userModel.birth.getDate()).padStart(2, '0'));
      this.infoForm.get('month').setValue(String(this.userModel.birth.getMonth() + 1).padStart(2, '0'));
      this.infoForm.get('year').setValue(String(this.userModel.birth.getFullYear()).padStart(4, '0'));
    }
  }

  saveNames() {
    this.userModel.name = this.name.value;
    this.userModel.surname = this.surname.value;
    this.userService.updateNameSurname(this.userModel).subscribe(
      response => {
          this.status = 'success';
      },
      error => {
          const errorMessage = error as any;
          console.log(errorMessage);
          if (errorMessage != null) {
              this.status = 'error';
          }
      }
    );
    this.identity.name = this.userModel.name;
    this.identity.surname = this.userModel.surname
    localStorage.setItem('identity', JSON.stringify(this.identity));
    this.router.navigate(['/profile/' + this.identity.username + '/config']);
  }

  savePassword() {
    this.userService.updatePassword(this.password.value).subscribe(
      response => {
          this.status = 'success';
      },
      error => {
          const errorMessage = error as any;
          console.log(errorMessage);
          if (errorMessage != null) {
              this.status = 'error';
          }
      }
    );
    this.router.navigate(['/profile/' + this.identity.username + '/config']);
  }

  saveInfo() {
    this.userModel.bio = this.bio.value;
    this.userModel.birth = new Date(this.month.value + "/" + this.day.value + "/" + this.year.value);
    this.userService.updateBioBirth(this.userModel).subscribe(
      response => {
          this.status = 'success';
      },
      error => {
          const errorMessage = error as any;
          console.log(errorMessage);
          if (errorMessage != null) {
              this.status = 'error';
          }
      }
    );
    this.identity.bio = this.userModel.bio;
    this.identity.birth = this.userModel.birth;
    localStorage.setItem('identity', JSON.stringify(this.identity));
    this.router.navigate(['/profile/' + this.identity.username + '/config']);
  }

  getDay() {
    if (this.userModel.birth !== undefined) {
      return String(this.userModel.birth.getDate()).padStart(2, '0')
    }
  }

  getMonth() {
    if (this.userModel.birth !== undefined) {
      return String(this.userModel.birth.getMonth() + 1).padStart(2, '0')
    }
  }

  getYear() {
    if (this.userModel.birth !== undefined) {
      return String(this.userModel.birth.getFullYear()).padStart(4, '0')
    }
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

  get bio() {
    return this.infoForm.get('biography');
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