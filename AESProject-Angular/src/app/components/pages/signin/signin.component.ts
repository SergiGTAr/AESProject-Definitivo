import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {UserModel} from '../../../models/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    providers: [UserService]
})

export class SigninComponent implements OnInit {
    public user: UserModel;
    public status: string;
    private token: string;
    private identity: string;
    signInForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.minLength(10)]),
        password: new FormControl('', [Validators.required, Validators.minLength(10)])
    });

    constructor(private userService: UserService, private router: Router) {
        
    }

    ngOnInit() {
        console.log('Component de login inicialitzat');
    }

    onSubmit() {
        this.user = new UserModel('','', '', '', '',
            this.email.value, this.password.value);
        this.userService.login(this.user).subscribe(
            response => {
                this.identity = response.user;
                console.log(this.identity);
                this.status = 'success';
                localStorage.setItem('identity', JSON.stringify(this.identity));
                this.getToken();
                this.router.navigate(['/home']);
            },
            error => {
                const errorMessage = error as any;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    getToken() {
        this.userService.login(this.user, 'true').subscribe(
            response => {
                this.token = response.token;

                console.log(this.token);

                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    // Guardem el token al localstorage
                    localStorage.setItem('token', this.token);
                }
            },
            error => {
                const errorMessage = error as any;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    get email() {
        return this.signInForm.get('email');
    }

    get password() {
        return this.signInForm.get('password');
    }
}
