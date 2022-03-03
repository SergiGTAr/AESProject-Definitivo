import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: []
})
export class SignupComponent implements OnInit {
    signUpForm = new FormGroup({
        groupNames: new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(10)]),
            surname: new FormControl('', [Validators.required, Validators.minLength(10)]),
            username: new FormControl('', [Validators.required, Validators.minLength(10)]),
        }),
        email: new FormControl('', [Validators.required, Validators.minLength(10)]),
        groupPasswords: new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(10)]),
            repeatedPassword: new FormControl('', [Validators.required, Validators.minLength(10)])
        }),
        sex: new FormControl('', [Validators.required])
    });
    
    constructor() { }

    ngOnInit() {
        
    }

    signup() {
        this.httpService.createUser({
            name: "morpheus",
            job: "leader"
        }).subscribe(
            data => {
              console.log("User Login: " + data.login);
              console.log("Bio: " + data.bio);
              console.log("Company: " + data.company);
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log("Client-side error");
              } else {
                console.log("Server-side error");
              }
            }
          );;
    }

    get name() { return this.signUpForm.get('groupNames').get('name'); }
    get surname() { return this.signUpForm.get('groupNames').get('surname'); }
    get username() { return this.signUpForm.get('groupNames').get('username'); }

    get email() { return this.signUpForm.get('email'); }

    get password() { return this.signUpForm.get('groupPasswords').get('password'); }
    get repeatedPassword() { return this.signUpForm.get('groupPasswords').get('repeatedPassword'); }

    get sex() { return this.signUpForm.get('sex'); }
}