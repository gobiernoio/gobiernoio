import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// Funciones
import { funcionesFormularios } from "./../../../functions/funciones-formularios";

// firebase
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { AuthService } from "./../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../services/firebase/database.service";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {
  @Output() archivos:EventEmitter<any> = new EventEmitter()
  
  archivosLista = [];

  constructor(
    private funciones:funcionesFormularios, 
    private cargaDeArchivos:AngularFireStorage
  ) { }

  ngOnInit() {
  }





  adjuntarArchivo(fileInput: any) {
    const file = fileInput.target.files[0];
    const idArchivo = this.funciones.generarFolio()
    const nombreCompuesto = idArchivo+"."+file.name.split('.')[1];
    const ref = this.cargaDeArchivos.ref(nombreCompuesto);
    const task = ref.put(file);

    const dataInicial = {
        progreso: 0,
        barraProgreso: true,
        datos: false,
        nombre: nombreCompuesto,
        url:""
    }



    let idTemporal = (this.archivosLista.push( dataInicial )) - 1;

    // observe percentage changes
    task.percentageChanges().subscribe( snapshot => {
        this.archivosLista[idTemporal].progreso = Math.round(snapshot);
    })

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
            ref.getDownloadURL().subscribe( snapshot => {
                this.archivosLista[idTemporal].barraProgreso = false;
                this.archivosLista[idTemporal].datos = true;
                this.archivosLista[idTemporal].url = snapshot;
                this.archivosLista[idTemporal].nombre = nombreCompuesto;
                this.archivosLista[idTemporal].size = file.size;
                this.archivosLista[idTemporal].tipo = file.type;
            });

            this.archivos.emit(this.archivosLista)
            console.log("La lista es ", this.archivosLista)
        })
    )
    .subscribe()
}
}
