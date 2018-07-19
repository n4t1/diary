import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AddDialogComponent } from '../main/add-dialog/add-dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ToolbarComponent,
    AddDialogComponent,
    SidenavComponent
  ],
  entryComponents: [
    AddDialogComponent
  ],
  exports: [
    ToolbarComponent
  ]
})
export class NavigationModule { }
