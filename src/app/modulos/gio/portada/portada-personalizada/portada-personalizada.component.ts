import { Component } from '@angular/core';
import { Router, Data } from "@angular/router";
// Importando data
import { portada } from "./../../../../../assets/data/menuPortada";
// import { chats } from "./../../../../../assets/data/gio-chats";
// Servicios
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
import { KeyValue } from '@angular/common';
// Emitter
import { ToolbarService } from "./../../../../services/comunication/toolbar.service";


@Component({
	selector: 'app-portada-personalizada',
	templateUrl: './portada-personalizada.component.html',
	styleUrls: ['./portada-personalizada.component.sass']
})
export class PortadaPersonalizadaComponent {
	public arrayOfKeys
	chats
	botones = portada.botones

	constructor(
		private _router:Router, 
		private _authService:AuthService, 
		private _databaseService:DatabaseService, 
		private _toolbarService:ToolbarService
		) {
		// this.chats = chats;
			
		this._toolbarService.dataToolbar.emit({ruta:''})
		
		
		this._databaseService.datos.database.ref('admin/data/chats').orderByChild('orden').limitToFirst(50).once('value', snapshot=>{
			console.log(snapshot.val())
			this.chats = snapshot.val()
		})
		
	}

	cargarChat(item){

		if( this._authService.traerUidSiExisteUsuario() === null ) {
			
			console.log("No existe usuario")
			this._authService.autorizacion.auth.signInAnonymously().then( usuario => {
				console.log("Se creó el usuario: ", usuario.user)

				item.remitenteUid = usuario.user.uid
				item.remitenteDisplayName = "Anónimo - " + usuario.user.uid
				item.remitentePhotoURL = usuario.user.photoURL
				item.remitenteIsAnonymous = usuario.user.isAnonymous
		
				this._router.navigate(['chat-view'], { queryParams : item })
			})			

		} else {
			
			
			this._authService.autorizacion.auth.onAuthStateChanged(data => {
				console.log("Aquí hay data")
				if(data['isAnonymous']) {
					console.log(" El usuario existe y es anonimo")

					item.remitenteUid = data['uid']
					item.remitenteDisplayName = "Anónimo - " + data['uid']
					item.remitentePhotoURL = data['photoURL']
					item.remitenteIsAnonymous = data['isAnonymous']

					this._router.navigate(['chat-view'], { queryParams : item })
				} else {
					console.log( "Aquí hay data", data )
					
					item.remitenteUid = data['uid']
					item.remitenteDisplayName = data['displayName']
					item.remitentePhotoURL = data['photoURL']
					item.remitenteIsAnonymous = data['isAnonymous']

					this._router.navigate(['chat-view'], { queryParams : item })
				}
				
			})

		}
	}



	cargarChatAnonimo(item) {

	}
	
	
	
	retornarSesion() {
		
		// Si exist usuuario cargamos sus chats de lo contrario creamos una sesión anónima
		this._authService.gioUsuario.subscribe(data => {
			return data

			// if (data) {
			// 	this.remitente = this.generarRemitente(params, data)
			// 	this.destinatario = this.generarDestinatario(params, data)				
			// 	this.cargarMensajes(this.remitente, this.destinatario)
				
			// } else {
			// 	this.autorizacion.crearUsuarioAnonimo()
			// }
		})

	}



	// Preserve original property order
	originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
		return 0;
	}


	// Order by ascending property value
	// valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
	// 	return a.value.localeCompare(b.value);
	// }

	// Order by descending property key
	// keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
	// 	return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
	// }
}








// menuElement.forEach( item => {
// 	this._databaseService.datos.database.ref('admin/data/menus').push(item)
// })