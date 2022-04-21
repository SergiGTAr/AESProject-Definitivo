import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    public url: string;

    constructor(public httpClient: HttpClient, private router: Router) {
        this.url = GLOBAL.url;
    }

    getPostsHome(page: number): Observable<any> {
        const token = localStorage.getItem('token')

        const headers = new HttpHeaders().set('Authorization', token.toString());

        return this.httpClient.get<any>(this.url + 'postsPropis/625eec94c516a016ec779e18', {headers});
    }

    getPostsProfile(user: UserModel): Observable<any> {
        const params = JSON.stringify(user);
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', token.toString());

        return this.httpClient.get(this.url + 'postsPropis/625eec94c516a016ec779e18', {headers});
    }
}
