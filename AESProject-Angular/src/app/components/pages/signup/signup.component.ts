import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {RegisterService} from '../../../services/register.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [RegisterService, HttpService]
})
export class SignupComponent implements OnInit {
    private message;
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

    constructor(private registerService: RegisterService, private httpService: HttpService) {
        
    }

    ngOnInit() {

    }

    onSubmit() {
        /*this.registerService.register(this.user).subscribe(
            response => {
                if (response.user && response.user.id) {
                console.log(response.user);
                }
            },
            error => console.log(error)
        );*/

        this.httpService.prova().subscribe(
            response => {
                this.message = response.message;
            },
            error => console.log(error)
        )
    }

    get name() { return this.signUpForm.get('groupNames').get('name'); }
    get surname() { return this.signUpForm.get('groupNames').get('surname'); }
    get username() { return this.signUpForm.get('groupNames').get('username'); }

    get email() { return this.signUpForm.get('email'); }

    get password() { return this.signUpForm.get('groupPasswords').get('password'); }
    get repeatedPassword() { return this.signUpForm.get('groupPasswords').get('repeatedPassword'); }

    get sex() { return this.signUpForm.get('sex'); }
}
