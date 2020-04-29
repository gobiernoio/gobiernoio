import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
// firebase
import { AngularFireStorage } from "@angular/fire/storage";
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
// Servicio Chats Toolbar
import { ToolbarService } from "./../../../../services/comunication/toolbar.service";
// Import mensaje object
import { Mensaje } from "./mensaje";
// Servicio de subida
import { FirebaseUploadService } from "./../../../../services/subida/firebase-upload.service";
import { Subida } from "./../../../../services/subida/subida";

@Component({
	selector: 'app-chat-view',
	templateUrl: './chat-view.component.html',
	styleUrls: ['./chat-view.component.sass']
})
export class ChatViewComponent implements OnInit, AfterViewChecked {
	@ViewChild('contenedor', { static: true }) private feedContainer: ElementRef

	remitente: any = {}
	destinatario: any = {}
	// usuario: firebase.User
	chatHistorial: any
	alturaChat = 100
	// Archivos
	subidaEnCurso: Subida
	mostrarProgreso: boolean = false
	porcentajeProgreso: number = 0

	constructor(
		public archivos: AngularFireStorage,
		public datos: DatabaseService,
		public autorizacion: AuthService,
		private parametros: ActivatedRoute,
		private subir: FirebaseUploadService,
		private _toolbarService: ToolbarService
	) {
		this.onResize()
		this.construirChat()
		this.actualizarBadge()
	}

	ngOnInit() {
	}


	// ===============================================================================
	// 			CONSTRUIR CHAT
	// ===============================================================================
	construirChat() {
		this.parametros.queryParams.subscribe(parametros => {
			if (parametros) {
				this.generarEmision(parametros)
				this.remitente = this.generarRemitente(parametros)
				this.destinatario = this.generarDestinatario(parametros)
				this.cargarMensajes(this.remitente, this.destinatario)
			} else {
				// console.log("No existen parametros, no se puede crear el chat")
			}
		})
	}

	
	actualizarBadge() {
		// Actualizar badge
		let updateBadge = {}
		updateBadge['chats/' + this.remitente.uid + '/misMensajes/' + this.destinatario.uid + '/badge'] = null

		this.datos.datos.database.ref().update(updateBadge).then(() => {
			console.log("Se borró el badge")
		})
	}




	enviarMensaje(mensajeVar, archivo?) {
		if (mensajeVar) {
			let idValue = this.datos.datos.createPushId()

			let datosArchivo

			if (archivo) {
				datosArchivo = {
					url: archivo.url,
					size: archivo.file.size,
					type: archivo.file.type,
					name: archivo.file.name
				}
			} else {
				datosArchivo = {}
			}

			let mensaje = new Mensaje(idValue, this.remitente, this.destinatario, mensajeVar, datosArchivo)
			let updates = this.armarUpdates(idValue, mensaje)

			this.datos.datos.database.ref().update(updates).then(() => {

				let ruta = `chats/${this.destinatario.uid}/misMensajes/${this.remitente.uid}/badge`

				this.datos.datos.database.ref(ruta).once('value', data => {
					let badge = data.val() + 1
					console.log("El badge actualizado será ", badge)

					let updates2 = {}
					updates2[`chats/${this.destinatario.uid}/misMensajes/${this.remitente.uid}/badge`] = badge

					this.datos.datos.database.ref().update(updates2).then(() => {
						console.log("Se actualizó el badge")
					})
				})
			})
		} else {
			console.log("No hay mensaje por envíar")
		}
	}


	armarUpdates(id, mensaje) {
		let updates = {}

		updates[`chats/${this.remitente.uid}/mensajes/${this.destinatario.uid}/${id}`] = mensaje
		updates[`chats/${this.remitente.uid}/misMensajes/${this.destinatario.uid}/mensaje`] = mensaje

		updates[`chats/${this.destinatario.uid}/mensajes/${this.remitente.uid}/${id}`] = mensaje
		updates[`chats/${this.destinatario.uid}/misMensajes/${this.remitente.uid}/mensaje`] = mensaje

		return updates
	}


	enviarMensajeConArchivo(event) {
		let file = event.target.files[0]
		this.subidaEnCurso = new Subida(file)
		this.subir.adjuntarArchivo(this.subidaEnCurso, 'usuarios/')

		// Subscribimos para que al finalizar envíe el mensaje
		this.subidaEnCurso.finalizado.subscribe(event => {
			if (event) {
				this.enviarMensaje("Mensaje con archivo", this.subidaEnCurso)
			}
		})
	}


	// ===============================================================================
	// 			CARGAR MENSAJES
	// ===============================================================================
	cargarMensajes(remitente, destinatario) {
		let ruta = 'chats/' + remitente.uid + '/mensajes/' + destinatario.uid

		this.datos.datos.database.ref(ruta).on('value', snapshot => {
			if (!snapshot.exists()) this.crearBienvenida()
			this.chatHistorial = snapshot.val()
		})
	}


	// ===============================================================================
	// 			CREAR BIENVENIDA
	// ===============================================================================
	crearBienvenida() {
		// console.log("Primera vez")
	}



	// ===============================================================================
	// 			GENERAR REMITENTE
	// ===============================================================================
	generarRemitente(params) {
		let remitente: any = {
			uid: params.remitenteUid,
			displayName: params.remitenteDisplayName,
			photoUrl: params.photoUrl
		}

		return remitente
	}


	// ===============================================================================
	// 			GENERAR DESTINATARIO
	// ===============================================================================
	generarDestinatario(params) {
		let destinatario: any = {
			imagenFondo: params.imagenFondo,
			uid: params.uid,
			nombre: params.displayName
		}
		return destinatario
	}


	// ===============================================================================
	// 			GENERAR DESTINATARIO
	// ===============================================================================
	generarEmision(params) {
		let destinatario: any = {
			imagenFondo: params.imagenFondo,
			uid: params.uid,
			nombre: params.displayName
		}

		let remitente: any = {
			uid: params.remitenteUid,
			displayName: params.remitenteDisplayName,
			photoUrl: params.photoUrl
		}

		let chat = {
			ruta: "chat", 
			remitente: remitente, 
			destinatario: destinatario
		}
		this._toolbarService.dataToolbar.emit(chat)
	}



	// ===============================================================================
	// 			FUNCIONES DE REDIMENSIÓN DE PANTALLA
	// ===============================================================================
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		let screenHeight = window.innerHeight;
		let screenWidth = window.innerWidth;
		this.alturaChat = screenHeight - 110
	}
	scrollToBottom(): void {
		this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
		// console.log("scrollTop", this.feedContainer.nativeElement.scrollTop)
	}
	ngAfterViewChecked() {
		this.scrollToBottom()
	}
}