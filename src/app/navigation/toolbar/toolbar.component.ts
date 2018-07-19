import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireauthService } from '../../shared/services/angular-fireauth.service';
import { AddDialogComponent } from '../../main/add-dialog/add-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  islogin = false;
  isOpen = false;

  constructor(private dialog: MatDialog, private authService: AngularFireauthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLogin().subscribe(val => {
      this.islogin = val;
      console.log('val');

      console.log(val);

      console.log('Is login');
      console.log(this.islogin);

    });
  }

  showUserName() {
    return this.authService.user.email;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '410px',
      disableClose: false
    });
  }

  openSidenav(): void {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
  }

}
