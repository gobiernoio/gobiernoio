import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GeocoderService } from "./../../../services/http/geocoder.service";

//Modal del mapa
import { MapaComponent } from "../../../elementos/componente-ubicacion/mapa.component";


@Component({
	selector: 'app-ubicacion',
	templateUrl: './ubicacion.component.html',
	styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {
	@Input() lista: string
	@Output() coords: EventEmitter<String> = new EventEmitter()
	coordenadas: any
	direccion:any
	// Ventana que se abre
	configuracionDialogo: MatDialogConfig = {}

	constructor(
		public dialog: MatDialog, 
		private geoCode:GeocoderService
	) {
	}

	ngOnInit() {
	}


	marcarUbicacion() {
		this.configuracionDialogo.width = "100%"
		this.configuracionDialogo.minWidth = "100%"

		const dialogoMapa = this.dialog.open(MapaComponent, this.configuracionDialogo)

		dialogoMapa.afterClosed().subscribe(result => {
			let latlng = JSON.parse(result)

			this.geoCode.traerDireccion(latlng).subscribe(direccion=>{
				this.direccion = direccion['results'][0]['formatted_address']
			})
			
			this.coordenadas = latlng
			this.coords.emit(latlng)
		})
	}


	
}
