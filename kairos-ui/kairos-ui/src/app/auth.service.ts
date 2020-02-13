import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean; // l'utilisateur est il connecté ?
  redirectUrl: string; // où rediriger l'utilisateur après connection

  constructor() { }

    login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name === 'fbockelee' && password === 'kairos');

    return of(true).pipe(
      delay(1000), tap( val => this.isLoggedIn = isLoggedIn)
    );
  }

  logout(): void {
     this.isLoggedIn = false;
  }

}
