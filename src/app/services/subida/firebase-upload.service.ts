import { Injectable, EventEmitter } from '@angular/core';
import { Subida } from "./subida";
import { finalize } from 'rxjs/operators';

// firebase
import { AngularFireStorage } from "@angular/fire/storage";



@Injectable({
	providedIn: 'root'
})
export class FirebaseUploadService {

	constructor(
		public archivos: AngularFireStorage
	) { }

	adjuntarArchivo(subida: Subida, carpeta) {
		subida.name = this.minimizarNombre(subida.file.name)
		const ref = this.archivos.ref(carpeta + subida.name)
		const task = ref.put(subida.file)
		subida.active = true

		task.percentageChanges().subscribe(snapshot => {
			// this.porcentajeProgreso = Math.round(snapshot);
			subida.progress = snapshot
		})

		task.snapshotChanges().pipe(
			finalize(() => {
				ref.getDownloadURL().subscribe(snapshot => {
					subida.url = snapshot
					subida.active = false
					subida.finalizado.emit(true)
				})
			})
		).subscribe()
	}

	// Recibe un nombre de archivo y returna uno más corto
	minimizarNombre(name) {
		return this.generarFolio() + "." + name.split('.')[1];
	}

	// Genera un folio númerico
	generarFolio() {
		let estampaString: string = new Date().getTime().toFixed()
		return estampaString.substring(6, estampaString.length)
	}
}