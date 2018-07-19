import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing.module';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { MainContentComponent } from './main-content/main-content.component';
import { TableTabsComponent } from './main-content/table-tabs/table-tabs.component';
import { TableComponent } from './main-content/table-tabs/table/table.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    MainContentComponent,
    TableTabsComponent,
    TableComponent,
    // AddDialogComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    // AddDialogComponent,
    ConfirmDialogComponent
  ],
})
export class MainModule { }
