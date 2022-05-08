import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { PostModel } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    public url: string;

    constructor(public httpClient: HttpClient, private router: Router) {
        this.url = GLOBAL.url;
    }

    getPostsHome(page: number, token): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token.toString());
        return this.httpClient.get<any>(this.url + 'allposts', {headers});
    }

    getPostsProfile(user: UserModel): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', token.toString());

        return this.httpClient.get(this.url + 'postsPropis/' + user.id, {headers});
    }

    savePost(content: string) {
        const params = {content: content};
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.post(this.url + 'post', params, {headers});
    }

    deletePost(post: string) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.delete(this.url + 'post/' + post, {headers});
    }
}
