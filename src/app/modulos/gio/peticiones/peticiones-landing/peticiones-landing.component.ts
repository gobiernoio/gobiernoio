import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';

// servicios
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
import { PaginaActualService } from "./../../../../services/comunication/pagina-actual.service";
// Emitter
import { ToolbarService } from "./../../../../services/comunication/toolbar.service";

@Component({
	selector: 'app-peticiones-landing',
	templateUrl: './peticiones-landing.component.html',
	styleUrls: ['./peticiones-landing.component.scss']
})
export class PeticionesLandingComponent {
	@ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
	usuarioNombre
	datosPeticiones: any = true

	constructor(
		private autorizacion: AuthService,
		private datos: DatabaseService,
		private paginaActual: PaginaActualService, 
		private _toolbarService:ToolbarService
	) {
		// Emisor
		this._toolbarService.dataToolbar.emit({ruta:'peticiones-landing'})

		// Seteamos la página inicial a la actual
		this.paginaActual.setPaginaActual();


		this.autorizacion.autorizacion.auth.onAuthStateChanged(data => {
				// console.log("La data es: ", data)
				if (data) {
					let usuarioUid = data.uid
					this.usuarioNombre = data.displayName
					let ruta = 'usuarios/' + usuarioUid + '/peticiones'
					let referencia = this.datos.datos.database.ref(ruta)
					let lista = this.datos.datos.list(referencia)

					// Obtenemos las peticiones de este usuario y las guardamos a variable iterable
					lista.valueChanges().subscribe(values => {
						this.datosPeticiones = values
					})
				}
		})

		// this.autorizacion.gioUsuario.subscribe(data => {
		// 	if (data) {
		// 		let usuarioUid = data.uid
		// 		this.usuarioNombre = data.displayName
		// 		let ruta = 'usuarios/' + usuarioUid + '/peticiones'
		// 		let referencia = this.datos.datos.database.ref(ruta)
		// 		let lista = this.datos.datos.list(referencia)

		// 		// Obtenemos las peticiones de este usuario y las guardamos a variable iterable
		// 		lista.valueChanges().subscribe(values => {
		// 			this.datosPeticiones = values
		// 		})
		// 	}
		// })
	}
}