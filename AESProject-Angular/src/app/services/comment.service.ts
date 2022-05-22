import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    public url: string;

    constructor(public httpClient: HttpClient, private router: Router) {
        this.url = GLOBAL.url;
    }

    getCommentsPost(post_id: string): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', token.toString());

        return this.httpClient.get(this.url + 'getCommentsByPost/' + post_id, {headers});
    }

    getNumberComments(post_id: string): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', token.toString());

        return this.httpClient.get(this.url + 'getCountCommentbyPost/' + post_id, {headers});
    }

    saveComment(content: string, post: string) {
        const params = {content: content, post};
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.post(this.url + 'saveComment', params, {headers});
    }
}
