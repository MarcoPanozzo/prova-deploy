import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class SharedModule {}