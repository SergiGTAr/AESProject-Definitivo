import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }

  /*createUser(name: String, password: String): Observable<any>{
    const data : any = {name: name, password: password}
    return this.http.post('http://172.26.160.1:3020/api/register', data);
  }*/

  public login(nom: string, password: string): boolean {
    if (nom == "" || password == "") {
        return false;
    } else {
        return true;
    }
  }
}