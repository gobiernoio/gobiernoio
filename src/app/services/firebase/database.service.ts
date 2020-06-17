import { Injectable } from '@angular/core';
// firebase
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	listaDirecciones

	constructor(
		public datos: AngularFireDatabase
	) {
	}


	enviarDatos(data){
		this.datos.database.ref('datos').push(data);
		// console.log(data);
	}
  
	public traerDirecciones(){
	  let referencia = this.datos.database.ref('admin/data/direcciones')
	  let lista = this.datos.list(referencia)
  
	  return lista.valueChanges()
	}
}
