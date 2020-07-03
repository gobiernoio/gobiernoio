import { Component, OnInit } from '@angular/core';
import * as admin from "firebase-admin";

// SERVICIOS
import { FirebaseadminService } from "./../../../../services/http/firebaseadmin.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";


@Component({
	selector: 'app-usuarios-lista',
	templateUrl: './usuarios-lista.component.html',
	styleUrls: ['./usuarios-lista.component.scss']
})
export class UsuariosListaComponent implements OnInit {
	chats

	constructor(
		private _fS: FirebaseadminService, 
		private _dB: DatabaseService
	) {

		// this._fS.traerUsuarios().subscribe(data=> {
		// 	console.log(data['users'])
		// })

		this._dB.datos.database.ref('chats').limitToFirst(1000).on('value', snapshot => {
			
			this.chats = snapshot.val()

			let items = Object.values(snapshot.val())
			console.log(this.chats)
			console.log( "Cuantos son: ", items.length )


			items.forEach((element)=>{


				if(element['mensajes']) {
					let cadena = JSON.stringify(element['mensajes'])
					let existeElemento = cadena.indexOf('remitente":{"nombre":"Anónimo - ')

					if( existeElemento != -1 ) {
						// console.log(element)
						// console.log(JSON.stringify(element))
						console.log("ES ANONIMO", JSON.stringify(element['mensajes']).indexOf('remitente":{"nombre":"Anónimo - '))

						// this._dB.datos.database.ref(`chats/${}`)

					} else {

						console.log("Que es esto?", element)

					}

				} else {
					console.log("No tiene mensajes", element)
				}

			})
			
			// let array = Object.values(snapshot.val())

			
			// array.forEach(element => {
				
			// 	if(element['perfil']){

			// 		if(element['perfil']['email']){
			// 			// console.log("El mail es: ", element['perfil']['email'])
			// 		} else {
						
						
			// 			console.log(element)


			// 		}

			// 	} else {
			// 		console.log("No existe el perfil", element)
			// 	}

			// });
		})

	}

	ngOnInit() {
	}


	eliminar(id){
		this._dB.datos.database.ref(`chats/${id}`).remove().then(()=>{
			console.log("Se borró correctamente el " + id)
		})
	}
}









// let item = data['users']

// 			// console.log("ITEM", item)

// 			item.forEach(user=>{

// 				if(user.email) {

// 					// console.log("El email es: ", user.email)
// 					this._dB.datos.database.ref(`usuarios/${user.uid}`).on('value', snapshot=>{
						
// 						let element = snapshot.val()

// 						if(element['menu']){
// 							console.log("D", snapshot.val())

// 						}

// 					})
					
// 				} else {
// 					console.log("El usuario es anónimo", user.email)

// 					// this._fS.eliminarUsuario(user.uid).subscribe(data=>{
// 					// 	console.log("Se eliminó: ", data)
// 					// })
// 				}

// 			})