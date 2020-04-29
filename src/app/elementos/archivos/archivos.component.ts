import { Component, OnInit } from '@angular/core';
// firebase
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { AuthService } from "./../../services/firebase/auth.service";
import { DatabaseService } from "./../../services/firebase/database.service";
// Otros
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.sass']
})
export class ArchivosComponent implements OnInit {

  uid;
  archivosLista = [];
  archivosArray = [];
  task;
  archivosDataArray;
  progreso;
  mostrarCarga:boolean = false;

  constructor(
    public archivos:AngularFireStorage, 
    public datos:DatabaseService, 
    public autorizacion:AuthService, 
  ) { }

  ngOnInit() {
    this.uid = this.autorizacion.autorizacion.auth.currentUser.uid;
    let ruta = 'usuarios/'+this.uid+'/archivos'
    let referencia = this.datos.datos.database.ref(ruta)
    let lista = this.datos.datos.list(referencia)

    // Obtenemos las peticiones de este usuario y las guardamos a variable iterable
    lista.valueChanges().subscribe(values=>{
      this.archivosDataArray = values
    })
  }



  adjuntarArchivo(fileInput: any) {
    const file = fileInput.target.files[0];
    const nombreCompuesto = this.generarAleatorio() + "." + file.name.split('.')[1];
    const ref = this.archivos.ref(nombreCompuesto);
    const task = ref.put(file);

    const dataInicial = {
        progreso: 0,
        barraProgreso: true,
        datos: false,
        nombre: nombreCompuesto,
        url:""
    }
    
    
    let idTemporal = (this.archivosArray.push( dataInicial )) - 1;


    // observe percentage changes
    task.percentageChanges().subscribe( snapshot => {
        this.mostrarCarga = true;
        this.archivosArray[idTemporal].progreso = Math.round(snapshot);
        this.progreso = Math.round(snapshot)
    })

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
            ref.getDownloadURL().subscribe( snapshot => {
                this.archivosArray[idTemporal].barraProgreso = false;
                this.archivosArray[idTemporal].datos = true;
                this.archivosArray[idTemporal].url = snapshot;
                this.archivosArray[idTemporal].nombre = nombreCompuesto;
                this.archivosArray[idTemporal].size = file.size;
                this.archivosArray[idTemporal].tipo = file.type;
                this.archivosArray[idTemporal].id = this.datos.datos.createPushId()

                this.datos.datos.database.ref('usuarios/'+this.uid+'/archivos').push(this.archivosArray[idTemporal])

                this.mostrarCarga = false;
            });

            this.archivosLista = this.archivosArray;

            console.log(this.archivosLista);
        })
    )
    .subscribe()

    // if (fileInput.target.files && fileInput.target.files[0]) {
    //     var reader = new FileReader();

    //     reader.onload = function (e : any) {
    //         // $('#preview').attr('src', e.target.result);
    //         console.log( e );
    //     }

    //     reader.readAsDataURL(fileInput.target.files[0]);
    // }
  }





  // ================================================
  // GENERAR NÚMERO ALEATORIO =======================
  generarAleatorio(){
      let estampa = new Date().getTime();
      let estampaString:string = estampa.toFixed();
      let longitud = estampaString.length
      let folio = estampaString.substring(6,longitud)

      return folio;
  }

  insertarArchivo() {
    console.log("insertando");
  }
}
