import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireauthService } from '../../shared/services/angular-fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(private authService: AngularFireauthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  login() {
    this.authService.login({
      login: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    });
  }

  signUp() {
    this.authService.signUp({
      login: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    });
  }

  logout() {
    this.authService.logout();
  }

}
