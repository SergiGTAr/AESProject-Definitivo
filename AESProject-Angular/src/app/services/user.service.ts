import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../global';
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

    /*createUser(name: String, password: String): Observable<any>{
      K
      const data : any = {name: name, password: password}
      return this.http.post('http://172.26.160.1:3020/api/register', data);
    }*/

    // tslint:disable-next-line:variable-name
    /*register(user_to_register: User): Observable<any> {
      const params = JSON.stringify(user_to_register);
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      return this.http.post(this.url + 'register', params, {headers});
    }*/
}
