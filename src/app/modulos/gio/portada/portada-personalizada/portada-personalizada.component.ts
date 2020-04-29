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
		
		
		this._databaseService.datos.database.ref('data/chats').orderByChild('orden').limitToFirst(50).once('value', snapshot=>{
			console.log(snapshot.val())
			this.chats = snapshot.val()
		})
			

		let menuElement = [
			//   {
			// 	"enlace" : "/extraviados-revisar",
			// 	"icon" : "search",
			// 	"texto" : "Célula de búsqueda"
			//   },
			//   {
			// 	"enlace" : "/grua-revisar",
			// 	"icon" : "directions_car",
			// 	"texto" : "Servicio de grúa"
			//   },
			//   {
			// 	"enlace" : "/ambiental-revisar",
			// 	"icon" : "nature",
			// 	"texto" : "Denuncia Ambiental"
			//   },
			//   {
			// 	"enlace" : "tramites-revisar/medio_ambiente",
			// 	"icon" : "insert_drive_file",
			// 	"texto" : "Trámites medio ambiente"
			//   },
			//   {
			// 	"enlace" : "/chats-list/chat_presidente",
			// 	"icon" : "chat",
			// 	"texto" : "Presidente Municipal"
			//   },
			//   {
			// 	"enlace" : "/chats-list/asesoria_juridica",
			// 	"icon" : "chat",
			// 	"texto" : "Asesoría jurídica"
			//   },
			//   {
			// 	"enlace" : "/chats-list/tramites_municipales",
			// 	"icon" : "chat",
			// 	"texto" : "Tramites municipales"
			//   },
			//   {
			// 	"enlace" : "/chats-list/covid",
			// 	"icon" : "chat",
			// 	"texto" : "Modulo Covid-19"
			//   },
			//   {
			// 	"enlace" : "/chats-list/pago_de_impuestos",
			// 	"icon" : "chat",
			// 	"texto" : "Pago de impuestos"
			//   },
			//   {
			// 	"enlace" : "/chats-list/registro_civil",
			// 	"icon" : "chat",
			// 	"texto" : "Registro civil"
			//   }
			//   {
			// 	"enlace" : "/chats-list/ecologia_y_medio_ambiente",
			// 	"icon" : "chat",
			// 	"texto" : "Ecología y medio ambiente"
			//   },
			//   {
			// 	"enlace" : "/chats-list/permisos",
			// 	"icon" : "chat",
			// 	"texto" : "Permisos"
			//   },
			//   {
			// 	"enlace" : "/chats-list/violencia_de_genero",
			// 	"icon" : "chat",
			// 	"texto" : "Violencia de genero"
			//   },
			//   {
			// 	"enlace" : "/chats-list/servicios_publicos",
			// 	"icon" : "chat",
			// 	"texto" : "Servicios públicos"
			//   },
			//   {
			// 	"enlace" : "/chats-list/servicios_del_dif",
			// 	"icon" : "chat",
			// 	"texto" : "Servicios del DIF"
			//   },
			//   {
			// 	"enlace" : "/chats-list/bolsa_de_empleo",
			// 	"icon" : "chat",
			// 	"texto" : "Bolsa de empleo"
			//   },
			//   {
			// 	"enlace" : "/chats-list/cartilla_militar",
			// 	"icon" : "chat",
			// 	"texto" : "Cartilla militar"
			//   },
			//   {
			// 	"enlace" : "/chats-list/reporta_una_fuga",
			// 	"icon" : "chat",
			// 	"texto" : "Reporta una fuga"
			//   },
			//   {
			// 	"enlace" : "/chats-list/reporta_un_bache",
			// 	"icon" : "chat",
			// 	"texto" : "Reporta un bache"
			//   },
			{
				"enlace" : "/chats-list/derechos_humanos",
				"icon" : "chat",
				"texto" : "Derechos humanos"
			  },
			//   {
			// 	"enlace" : "/chats-list/transparencia",
			// 	"icon" : "chat",
			// 	"texto" : "Transparencia"
			//   }, 
			//   {
			// 	"enlace" : "/chats-list/modulo_anticorrupcion",
			// 	"icon" : "chat",
			// 	"texto" : "Módulo anticorrupción"
			//   },
			//   {
			// 	"enlace" : "/chats-list/derechos_humanos",
			// 	"icon" : "chat",
			// 	"texto" : "Derechos humanos"
			//   }
			//   {
			// 	"enlace" : "/chats-list/atencion_a_victimas_de_delito",
			// 	"icon" : "chat",
			// 	"texto" : "Atención a victimas de delito"
			//   },
		]

		
		// menuElement.forEach( item => {
		// 	this._databaseService.datos.database.ref('usuarios/t58ySQnUXEP52p64KvXDBjSHaaH3/menu').push(item)
		// })
		
		
		
		// this._databaseService.datos.database.ref('usuarios/NZppp7PflEaIdZvWkg4DnFVzXBw1/menu').push(menuElement)
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
