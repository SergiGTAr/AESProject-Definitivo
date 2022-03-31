import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {GLOBAL} from './global';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    public url: string;

  constructor(public http: HttpClient) {
      this.url = GLOBAL.url;
  }

  register(user: any) {
      return this.http.post<any>('http://localhost:3200/api/register', user);
  }
  // tslint:disable-next-line:variable-name
  /*register(user_to_register: User): Observable<any> {
    const params = JSON.stringify(user_to_register);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(this.url + 'register', params, {headers});
  }*/
}
