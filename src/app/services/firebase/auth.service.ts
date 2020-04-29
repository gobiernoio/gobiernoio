import { Injectable } from '@angular/core';
// firebase
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { auth } from 'firebase';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';



@Injectable({
	providedIn: 'root'
})
export class AuthService {
	gioUsuario
	
	constructor(
		public autorizacion: AngularFireAuth,
		public _angularFireDatabase: AngularFireDatabase, 
		private ruta:Router
	) {
		this.autorizacion.auth.onAuthStateChanged(data => {
			this.gioUsuario = data

			if(data){
				this.comprobarCrearPerfil(data)
			}
		})
	}


	// ============================================================
	// 		CREAR USUARIO ANÓNIMO
	// ============================================================
	crearUsuarioAnonimo() {
		this.autorizacion.auth.signInAnonymously().then(usuario => {
			console.log("Sesión anónima creada", usuario)
		}).catch(error => {
			console.log("Error en la sesión anónima", error)
		})
	}


	// ============================================================
	// 		CREAR USUARIO CON E-MAIL
	// ============================================================
	crearUsuarioConEmail(data: any) {
		let email = data.email;
		let password = data.password;
		let displayName = data.displayName;

		this.autorizacion.auth.createUserWithEmailAndPassword(email, password).then(usuario => {
			usuario.user.updateProfile({
				displayName: displayName
			})
		})
	}


	// ============================================================
	// 		COMPROBAR CREAR USUARIO
	// ============================================================
	comprobarCrearPerfil(data:any) {
		// let email = data.email;
		// let password = data.password;
		// let displayName = data.displayName;

		// this.autorizacion.auth.createUserWithEmailAndPassword(email, password).then(usuario => {
		// 	usuario.user.updateProfile({
		// 		displayName: displayName
		// 	})
		// })
	}


	// ============================================================
	// 		INICIAR SESION FACEBOOK
	// ============================================================
	facebookAuth() {
		return this.AuthLogin(new auth.FacebookAuthProvider)
	}


	// ============================================================
	// 		GENERICO CON PROVIDER
	// ============================================================
	AuthLogin(provider) {
		return this.autorizacion.auth.signInWithPopup(provider)
			.then((result) => {
				console.log('You have been successfully logged in!')
			}).catch((error) => {
				console.log(error)
			})
	}


	// ============================================================
	// 		CERRAR SESIÓN
	// ============================================================
	cerrarSesion() {
		this.autorizacion.auth.signOut()
	}


	// ============================================================
	// 		TRAER UID DE USARIO
	// ============================================================
	traerUidSiExisteUsuario() {
		if (this.autorizacion.auth.currentUser) {
			return this.autorizacion.auth.currentUser.uid
		} else {
			return null;
		}
	}
}



// ============================================================
// 		LISTA DE CÓDIGOS EN DESUSO
// ============================================================


// SE USABA PARA PASAR EL PIPE COMO ASYNCRONO DE LOS DATOS DE USUARIOS
// SE USA EN EL TEMLATE COMO :   *ngIf="autorizacion.gioUsuario | async as usuario; else login"
// UTILIZA EL IMPORT: import { map } from "rxjs/operators";
// =============================================
// gioUsuario = this.autorizacion.authState.pipe(
// 	map(authState => {
// 		if (authState) {
// 			return authState
// 		} else {
// 			return false
// 		}
// 	})
// )