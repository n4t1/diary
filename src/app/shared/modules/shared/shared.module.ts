import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
