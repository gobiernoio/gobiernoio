import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { AgmGeocoder, MapsAPILoader } from "@agm/core";

@Component({
  selector: 'mapa',
  templateUrl: './mapa.component.html', 
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {

  latMapa: number;
  lngMapa: number;
  lat: number;
  lng: number;

  coordenadas:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) {
      this.latMapa = 19.5703789;
      this.lngMapa = -99.0700547;

      this.lat;
      this.lng;
  }

  elegirUbicacion(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.coordenadas = JSON.stringify(event.coords);
  }


  encontrarMiUbicacion() {
    console.log("Le diste click a encontrar mi ubicación")

    navigator.geolocation.getCurrentPosition(data => {
      console.log("Lo que captura es esto:", data)

      this.latMapa = data.coords.latitude
      this.lngMapa = data.coords.longitude

      this.lat = data.coords.latitude
      this.lng = data.coords.longitude

      let coordenadas = {
        "lat":data.coords.latitude, 
        "lng":data.coords.longitude
      }

      this.coordenadas = JSON.stringify(coordenadas)

      
    })
  }
}