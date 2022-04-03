import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {UserModel} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public url: string;

    constructor(public httpClient: HttpClient) {
        this.url = GLOBAL.url;
    }

    register(user: UserModel): Observable<any> {
        const userToJson = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post<any>(this.url + 'register', userToJson, {headers});
    }

    login() {
        return this.httpClient.get<any>(this.url + 'proves');
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
