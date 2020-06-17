import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class FirebaseadminService {
	urlBase: string = 'http://localhost:5000/ecatepecapp/us-central1/app'
	tipo: string = 'json'
	
	
	constructor(
		private http:HttpClient
	) {}

    
    traerUsuarios(){
        return this.http.get(`${this.urlBase}/get/usuarios`)
    }

    eliminarUsuario(uid){
        return this.http.delete(`${this.urlBase}/delete/usuario/${uid}`)
        // return this.http.post(`${this.urlBase}/delete/usuario/`, {"uid":uid})
    }

}
