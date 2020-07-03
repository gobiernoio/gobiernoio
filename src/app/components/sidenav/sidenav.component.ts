import { Component } from '@angular/core';
// Importar DAtos
import { menus } from "./../../../assets/data/menus";
// firebase
import { AuthService } from "../../services/firebase/auth.service";
import { DatabaseService } from "../../services/firebase/database.service";



@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent {

	menuPrincipal: any = menus.menuPrincipal
	// menuAdministrador: any = menus.menuAdministrador
	menuAdministrador: any
	administrador: any = false
	usuario:any

	constructor(
		private _authService:AuthService, 
		private _databaseService:DatabaseService
	) {
		
		// Escuchamos la sesión
		this._authService.autorizacion.auth.onAuthStateChanged(data => {
			// Si existe sesión traemos los datos del usuario
			if(data) {

				this.traerDataUsuario(data['uid'])


				this._databaseService.datos.database.ref(`usuarios/${data.uid}/menu`).on('value', data => {
					this.menuAdministrador = data.val()
				})
			}
		})
	}

	// Obtiene los datos del usuario guardados en firebase realtime database
	traerDataUsuario(uid){
		// Creamos la referencia a la base de datos
		let ref = this._databaseService.datos.database.ref(`usuarios/${uid}`)
		// Por única vez si la referencia retorna un dato, lo guardamos en la variable globarl administrador
		ref.once('value', data => {

			this.usuario = data.val()

			if( data.val() != null) {
				
				if ( !("undefined" === typeof(data.val()['perfil'])) ) {
					this.administrador = data.val().perfil.isAdmin
				}

			}
		})
	}



}