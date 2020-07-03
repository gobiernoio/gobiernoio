import { Component } from '@angular/core';
import { environment } from "./../../../../../environments/environment";
import { data } from "./../../../../../assets/data/data";
// import { chats } from "../../../../../assets/data/_gio-chats";

// Servicios
import { DatabaseService } from "./../../../../services/firebase/database.service";

@Component({
	selector: 'app-portada',
	templateUrl: './portada.component.html',
	styleUrls: ['./portada.component.sass']
})
export class PortadaComponent {
	// chats2

	portadaPersonalizada = environment.configuracionAplicacion.portadaPersonalizada
	// chats2 = chats
	// enlaces = data.enlaces


	constructor() {
	}
}
