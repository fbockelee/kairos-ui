import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
        private authService: AuthService,
        private router: Router
      ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let url: string = state.url;
    return this.checkLogin(url);
  }

  // Méthode d'aide pour le Guard, qui interroge notre service.
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
        this.authService.redirectUrl = url;
    this.router.navigate(['/login']);

    return false;
  }

}
