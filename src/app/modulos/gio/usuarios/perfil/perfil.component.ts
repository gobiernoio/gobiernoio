import { Component, OnInit } from '@angular/core';

// Servicios
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
	formulario: FormGroup
	uid

	constructor(
		private auth: AuthService,
		private db: DatabaseService,
		private _formBuilder: FormBuilder,
	) {


		this.formulario = this._formBuilder.group({
			uid: new FormControl(''),
			displayName: new FormControl(''),
			email: new FormControl(''),
			phoneNumber: new FormControl('')
		})
	}

	ngOnInit() {

		this.auth.autorizacion.authState.subscribe(data => {
			console.log(data)
			this.getPerfil(data.uid)

			this.uid = data.uid
		})

	}


	getPerfil(uid) {
		this.db.datos.database.ref(`usuarios/${uid}/perfil`).on('value', snapshot => {


			if (snapshot.val()) {
				console.log("perfil", snapshot.val())

				// this.formulario.setValue({
				// 	uid: snapshot.val()['uid'],
				// 	displayName: snapshot.val()['displayName'],
				// 	email: snapshot.val()['email'],
				// 	phoneNumber: snapshot.val()['phoneNumber'],
				// })
			} else {
				console.log("No hay perfil guardado")
			}

		})
	}

	procesarFormulario() {
		console.log("Procesar formulario", this.formulario.value)

		this.db.datos.database.ref('usuarios/eRO0ZfW7ahWhmVzUYpsTNB3GoPN2/perfil').update(this.formulario.value)
	}
}
