import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenusComponent } from './menus.component';
import { Routes, RouterModule } from '@angular/router';


// Angular material
import { DragDropModule } from "@angular/cdk/drag-drop";
import {  MAT_DATE_LOCALE, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';


const routes:Routes = [
  {
    path: '**', 
    component: MenusComponent, 
    children: []
  }
]

@NgModule({
  declarations: [MenusComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    DragDropModule, 
    MatIconModule, 
    FormsModule, ReactiveFormsModule, 
    MatCardModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule 
  ]
})
export class MenusModule { }
