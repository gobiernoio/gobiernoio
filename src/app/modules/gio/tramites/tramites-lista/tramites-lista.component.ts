import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { data } from "./../../../../../assets/data/data";



@Component({
	selector: 'app-tramites-lista',
	templateUrl: './tramites-lista.component.html',
	styleUrls: ['./tramites-lista.component.sass']
})
export class TramitesListaComponent {
	color:string
	banner:string
	tramites:any
	

	constructor(
		private parametros: ActivatedRoute
	) {
		// Obtiene el id de la dirección
		let destinatario = this.parametros.snapshot.paramMap.get('id')
		this.banner = data.tramites[destinatario].imagenTitular
		this.color = "rgba("+data.tramites[destinatario].colorRgba+", 0.3)"

		// Esta línea si funciona
		this.tramites = data.tramites[destinatario].tramites
		console.info("This.tramites", this.tramites)
	}
}
