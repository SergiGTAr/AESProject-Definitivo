import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {UserModel} from 'src/app/models/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [UserService]
})
export class SignupComponent implements OnInit {
    private message: any;
    private user: UserModel;
    status: string;

    signUpForm = new FormGroup({
        groupNames: new FormGroup({
            name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,30}$/)]),
            surname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,30}$/)]),
            username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1,50}$/)]),
        }),
        email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)]),
        groupPasswords: new FormGroup({
            password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]),
            repeatedPassword: new FormControl('', [Validators.required])
        }),
        sex: new FormControl('', [Validators.required])
    });

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {

    }

    onSubmit() {
        this.user = new UserModel(this.name.value, this.surname.value, this.sex.value, this.username.value,
            this.email.value, this.password.value);

        this.userService.register(this.user).subscribe(
            response => {
                if (response.user && response.user._id){
                    this.message = response.user;
                    this.status = 'success';
                    console.log(this.message._id);
                    this.router.navigate(['/signIn']);
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(error);
    }
        );
    }

    get name() {
        return this.signUpForm.get('groupNames').get('name');
    }

    get surname() {
        return this.signUpForm.get('groupNames').get('surname');
    }

    get username() {
        return this.signUpForm.get('groupNames').get('username');
    }

    get email() {
        return this.signUpForm.get('email');
    }

    get password() {
        return this.signUpForm.get('groupPasswords').get('password');
    }

    get repeatedPassword() {
        return this.signUpForm.get('groupPasswords').get('repeatedPassword');
    }

    get sex() {
        return this.signUpForm.get('sex');
    }
}
