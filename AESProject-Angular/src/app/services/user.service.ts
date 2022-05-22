import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public url: string;
    public identity;
    public token;

    constructor(public httpClient: HttpClient, private router: Router) {
        this.url = GLOBAL.url;
    }

    register(user: UserModel): Observable<any> {
        const userToJson = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post<any>(this.url + 'register', userToJson, {headers});
    }

    login(user: UserModel, gettoken = null): Observable<any> {
        if (gettoken != null) {
            user.gettoken = gettoken;
        }

        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.httpClient.post(this.url + 'login', params, {headers});
    }

    identifyUser() {
        const identity = JSON.parse(localStorage.getItem('identity'));

        if (identity !== 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        const token = localStorage.getItem('token');

        if (token !== 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    getUser(user: UserModel): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        if (user.id) {
            return this.httpClient.get(this.url + 'userbyid/' + user.id, {headers});
        } else if (user.username) {
            return this.httpClient.get(this.url + 'userbyusername/' + user.username, {headers});
        }
    }

    newFollow(user_id: string): Observable<any> {
        const params = {id: user_id};
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.post(this.url + 'newfollow', params, {headers});
    }

    updateNameSurname(userModel: UserModel): Observable<any> {
        const params = {user : userModel};
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.post(this.url + 'updatenamesurname', params, {headers});
    }

    updatePassword(userPassword: string): Observable<any> {
        const params = {password:userPassword};
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.post(this.url + 'updatepassword', params, {headers});
    }
    
    updateBioBirth(userModel: UserModel): Observable<any> {
        const params = {user : userModel};
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.post(this.url + 'updatebiobirth', params, {headers});
    }
}
