import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosListaComponent } from './usuarios-lista.component';
import { Routes, RouterModule } from '@angular/router';

import { FirebaseadminService } from "./../../../../services/http/firebaseadmin.service";
import { HttpClientModule } from "@angular/common/http";

const rutas: Routes = [
	{
		path: '**',
		component: UsuariosListaComponent,
		children: []
	}
]


@NgModule({
	declarations: [UsuariosListaComponent],
	imports: [
		CommonModule, 
		RouterModule.forChild(rutas), 
		HttpClientModule
	], 
	providers: [FirebaseadminService]
})
export class UsuariosListaModule { }
