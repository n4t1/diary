import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../models/account';
import { Observable, Subject } from 'rxjs';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AngularFireauthService {

  user: User = null;

  islogin = new Subject<boolean>();

  constructor(private auth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) {
    auth.user.subscribe((user) => {
      if (user) {
        this.user = user;
        // console.log('Info about user');
        // console.log(user);
        console.log('User uid:');
        console.log(user.uid);
        this.islogin.next(true);
      } else {
        this.user = null;
        // console.log('Info about user');
        // console.log(user);
        this.islogin.next(false);
      }
    });
  }

  isLogin(): Observable<boolean> {
    return this.islogin.asObservable();
  }

  login(account: Account) {
    this.auth.auth.signInWithEmailAndPassword(account.login, account.password)
      .then((result) => {
        // console.log('login');
        const snackBarRef = this.snackBar.open('Success logged in', '', {duration: 1000 });
        this.router.navigate(['main']);
      }).catch((err) => {
        console.log(err);
      });
  }

  signUp(account: Account) {
    this.auth.auth.createUserWithEmailAndPassword(account.login, account.password)
      .then((result) => {
        // console.log('create user & login');
        const snackBarRef = this.snackBar.open('Success sign up & logged in', '', {duration: 1000 });
        this.router.navigate(['main']);
      }).catch((err) => {
        console.log(err);
      });
  }

  logout() {
    this.auth.auth.signOut();
    // console.log('logout');
    const snackBarRef = this.snackBar.open('Success logged out', '', {duration: 1000 });
    this.router.navigate(['login']);
  }
}
