import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class GeocoderService {
	urlBase: string = 'https://maps.googleapis.com/maps/api/geocode'
	tipo: string = 'json'
	mapsKey: string = environment.googleMaps
	
	constructor(
		private http:HttpClient
	) {}



	traerDireccion(latlng){
		let url = `${this.urlBase}/${this.tipo}?latlng=${latlng.lat},${latlng.lng}&key=${this.mapsKey}`
		return this.http.get(url);
	}
}
