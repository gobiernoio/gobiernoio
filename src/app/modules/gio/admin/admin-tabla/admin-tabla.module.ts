import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTablaComponent } from './admin-tabla.component';
import { Routes, RouterModule } from '@angular/router';

import { MatPaginatorModule, MatSortModule, MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSnackBarModule } from "@angular/material";

const rutas: Routes = [
	{
		path: '**',
		component: AdminTablaComponent
	}
]

@NgModule({
	declarations: [AdminTablaComponent],
	imports: [
		CommonModule, 
		RouterModule.forChild(rutas), 
		MatPaginatorModule, MatSortModule, MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSnackBarModule
	]
})
export class AdminTablaModule { }
