import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {MessageModel} from '../models/message.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    public url: string;

    constructor(public httpClient: HttpClient) {
        this.url = GLOBAL.url;
    }

    addMessage(token, message: MessageModel): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        return this.httpClient.post(this.url + 'missatge', message, {headers});
    }

    getMyMessages(token, page = 1): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.get((this.url + 'missatgesenviats/' + page), {headers});
    }

    getEmmitMessages(token, page = 1): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.httpClient.get((this.url + 'missatgesrebuts/' + page), {headers});
    }
}
