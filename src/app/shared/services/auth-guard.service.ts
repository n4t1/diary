import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AngularFireauthService } from './angular-fireauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private auth: AngularFireauthService, private router: Router) {
    // console.log('auth guard islogin');
    // console.log(this.islogin);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.user) {
      console.log('authGuard can');
      // console.log(this.auth.user);
      this.auth.islogin.next(true);
      return true;
    }
    console.log('authGuard no');
    // console.log(this.auth.user);
    this.auth.islogin.next(false);
    this.router.navigate(['login']);
    return false;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): boolean {
    if (this.auth.user) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
