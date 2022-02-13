import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor() {

  }

  public login(nom: string, password: string): boolean {
    if (nom == "" || password == "") {
        return false;
    } else {
        return true;
    }
  }
}