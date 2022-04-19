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
        return this.httpClient.get<any>(this.url + 'posts/' + page);
    }

    getPostsProfile(user: UserModel): Observable<any> {
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.httpClient.post(this.url + 'getOwnPosts',  params, {headers});
    }
}
