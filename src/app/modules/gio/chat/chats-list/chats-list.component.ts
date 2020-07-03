import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
// firebase
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
// import { chats } from "../../../../../assets/data/_chats";
import 'hammerjs';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { KeyValue } from '@angular/common';
// Emitter
import { ToolbarService } from "./../../../../services/comunication/toolbar.service";

@Component({
	selector: 'app-chats-list',
	templateUrl: './chats-list.component.html',
	styleUrls: ['./chats-list.component.sass']
})
export class ChatsListComponent {
	usuario:any
	chats:any = []
	data:any
	ruta:any = false

	constructor( 
		private datos: DatabaseService, 
		private parametros: ActivatedRoute, 
		private fas:AuthService, 
		private router:Router, 
		private _bottomSheet: MatBottomSheet, 
		private _toolbarService:ToolbarService
	) {
		// Emisor
		this._toolbarService.dataToolbar.emit({ruta:'chats-list'})
		
		this.parametros.params.subscribe(parametros=>{

			console.log("Que mandas?", parametros)

			this.datos.datos.database.ref('chats/' + parametros.lista + '/misMensajes').orderByChild('mensaje/id').on('child_added', snapshot => {

				console.log(snapshot.val())
				this.chats.push(snapshot.val())
			})
		})
	}

	

	abrirChat(data){
		console.log("El data que se abrirá abrir es:", data.value.mensaje)
		let item = data.value.mensaje

		// let ruta = '/chat-view/covid/'+item.uid+'/'+this.ruta

		let params = {
			id: item.remitente.uid, 
			tipo: "chat", 
			url: "chat-view", 
			displayName: item.remitente.nombre, 
			uid: item.remitente.uid, 
			remitenteUid: item.destinatario.uid, 
			remitenteDisplayName: item.destinatario.nombre
		}

		console.log("Los params son:", params)
		
		this.router.navigate(['chat-view'], { queryParams : params})
	}


	// Preserve original property order
	originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
		return 0;
	}
}


@Component({
	selector: 'bottom-sheet',
	templateUrl: 'chat-list-sheet.html',
  })
  export class BottomSheet {
	constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheet>) {}
  
	openLink(event: MouseEvent): void {
	  this._bottomSheetRef.dismiss();
	  event.preventDefault();
	}
  }