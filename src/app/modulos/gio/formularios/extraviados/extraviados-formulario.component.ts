// 1602 9361
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
// Components
import { ArchivosComponent } from "../../../../elementos/archivos/archivos.component";
import { MapaComponent } from "../../../../elementos/componente-ubicacion/mapa.component";
import { DebesIniciarSesionComponent } from "../../../../elementos/debes-iniciar-sesion/debes-iniciar-sesion.component";
// Servicios
import { AuthService } from "../../../../services/firebase/auth.service";
import { DatabaseService } from "../../../../services/firebase/database.service";
import { FirebaseUploadService } from "../../../../services/subida/firebase-upload.service";
import { PaginaActualService } from "../../../../services/comunication/pagina-actual.service";
import { Subida } from "../../../../services/subida/subida";
// Modelos
import { GioUsuario } from "../../../../modelos/usuario";


@Component({
    selector: 'app-tramites',
    templateUrl: './extraviados-formulario.component.html',
    styleUrls: ['./extraviados-formulario.component.scss']
})
export class PeticionesFormularioComponent implements OnInit {
    mostrarFolio = false
    usuarioPerfilGio: GioUsuario = new GioUsuario("", "", false)
    formGroupPeticiones;
    usuario
    direcciones
    archivosLista = []
    subidaEnCurso: Subida
    @ViewChild('formDirectivePeticiones', { static:true }) formDirectivePeticiones;

    // Constructor
    constructor(
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
        public datos: DatabaseService,
        public autorizacion: AuthService,
        private router: Router,
        public paginaActual: PaginaActualService,
        private subir: FirebaseUploadService
    ) {

        this.autorizacion.autorizacion.auth.onAuthStateChanged(data => {
            if (data) {
                this.llenarFormularioSiExistePerfilDeUsuario(data.uid)
                this.usuario = data
            }
        })
    }



    ngOnInit(): void {
        // Construir formulario sin datos
        this.construirFormulario({})
        // Agregamos la página actual para hacer el retorno
        this.paginaActual.setPaginaActual();
    }



    // Comprueba usuario y construye formulario con el data recibido:  Recibe UID como parametro
    llenarFormularioSiExistePerfilDeUsuario(uid) {
        let referencia = this.datos.datos.database.ref(`usuarios/${uid}/perfil`)

        this.datos.datos.object(referencia).snapshotChanges().subscribe(data => {
            // Solo si hay datos vuelve a llamar construir formulario
            if(data.payload.val()) {
                this.construirFormulario(data.payload.val())
            }
        })
    }



    // Construye el formulario vacio o con el perfil asignado
    construirFormulario(datos) {
        let uid = datos.uid ? datos.uid : "1"
        this.formGroupPeticiones = this._formBuilder.group({
            id: [uid],
            nombre: [datos.nombre, Validators.required],
            sexo: ['', Validators.required],
            fecha_nacimiento: [datos.fecha_nacimiento], 
            fecha_extravio: [datos.fecha_extravio], 
            direccion1: [datos.direccion1],
            descripcion: [datos.descripcion, Validators.required],
            
            nombre2: [datos.nombre2, Validators.required],
            email: [datos.email, Validators.required],
            telefonos: [datos.telefonos, Validators.required],

            archivosArray: [[]],
            coordenadas: [[]],
            // descripcion: ['', Validators.required]
        })
    }



    // PROCESAR FORMULARIO
    procesarFormulario() {
        if (this.usuario) {
            let pushId = this.datos.datos.createPushId()
            let perfilUsuarioActualizado: GioUsuario = this.componerDatosUsuario(pushId)
            // Envía el formulario a firebase 
            this.enviarDatosFirebase(pushId, perfilUsuarioActualizado)
        } else {
            this.dialogoDebesIniciarSesion()
            console.log("NO HAY USUARIO")
        }
    }

    enviarDatosFirebase(pushId, perfilUsuario) {
        console.log("se va a mandar", this.formDirectivePeticiones.value)

        let uid = this.usuario.uid
        let destinatario = this.formDirectivePeticiones.value.destinatario
        let updates = {}
        // updates[`usuarios/${perfilUsuario.uid}/perfil`] = perfilUsuario
        updates[`usuarios/${uid}/extraviados/${pushId}`] = this.formDirectivePeticiones.value
        updates[`admin/peticiones/extraviados/${pushId}`] = this.formDirectivePeticiones.value

        
        this.datos.datos.database.ref().update(updates).then(() => {
            console.log("Se enviaron las actualizaciones")
        }).catch(() => {
            console.log("Hubo un error en la actualización")
        })
    }

    // Arma el mensaje con datos + formulario
    componerDatosUsuario(pushId) {
        let usuarioActualizado = new GioUsuario("", "", false)
        this.formGroupPeticiones.value.id = pushId
        let uid = this.usuario.uid

        usuarioActualizado.uid = uid
        usuarioActualizado.nombre = this.formGroupPeticiones.value.nombre
        usuarioActualizado.direccion1 = this.formGroupPeticiones.value.direccion1
        usuarioActualizado.fotoUrl = ""
        usuarioActualizado.email = this.formGroupPeticiones.value.email
        usuarioActualizado.emailVerificado = false

        return usuarioActualizado
    }


    adjuntarArchivo(event) {
        let file = event.target.files[0]
        this.subidaEnCurso = new Subida(file)
        this.subir.adjuntarArchivo(this.subidaEnCurso, 'usuarios/')

        // Subscribimos para que al finalizar agregamos el archivo al array
        this.subidaEnCurso.finalizado.subscribe(event => {
            if (event) {
                this.agregarArchivoAlArray(this.subidaEnCurso)
                this.formGroupPeticiones.value.archivosArray = this.archivosLista;
            }
        })
    }

    // Ingresa item al array de archivo, primero lo compone
    agregarArchivoAlArray(item:Subida) {
        this.archivosLista.push( item.construirJson() )
    }


    // Función que llama al dialogo en caso de no haber sesión
    dialogoDebesIniciarSesion(): void {
        const dialogRef = this.dialog.open(DebesIniciarSesionComponent, {
            width: '350px',
            data: { name: "Alberto", animal: "Gato" }
        })

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        })
    }


    llamarMarcarUbicacion() {
        let configuracionDialogo: MatDialogConfig = {}
        configuracionDialogo.width = "100%"
        configuracionDialogo.minWidth = "100%"
        // configuracionDialogo.panelClass = 'full-width-dialog'
        const dialogoMapa = this.dialog.open(MapaComponent, configuracionDialogo)

        dialogoMapa.afterClosed().subscribe(result => {
            this.formGroupPeticiones.value.coordenadas = JSON.parse(result)
            this.formGroupPeticiones.value.coordenadas = this.formGroupPeticiones.value.coordenadas
        })
    }

    // Adjuntar de mi biblioteca
    llamarAdjuntar() {
        let configuracionDialogo: MatDialogConfig = {}
        configuracionDialogo.width = "100%"
        configuracionDialogo.minWidth = "100%"

        const dialogoMapa = this.dialog.open(ArchivosComponent, configuracionDialogo);

        dialogoMapa.afterClosed().subscribe(result => {
            if (result) {
                this.insertarRegreso(result)
            } else {
                console.log("No hay regreso de información")
            }
        });
    }


    // Insertar al ArrayArchivos el archivo retornado por mi biblioteca
    insertarRegreso(result) {
        const dataInicial = {
            progreso: 0,
            barraProgreso: false,
            datos: false,
            nombre: "",
            url: ""
        }
        let idTemporal = (this.formGroupPeticiones.value.archivosArray.push(dataInicial)) - 1;
        this.formGroupPeticiones.value.archivosArray[idTemporal].datos = true;
        this.formGroupPeticiones.value.archivosArray[idTemporal].url = result.url;
        this.formGroupPeticiones.value.archivosArray[idTemporal].nombre = result.nombre;
        this.formGroupPeticiones.value.archivosArray[idTemporal].size = result.size;
        this.formGroupPeticiones.value.archivosArray[idTemporal].tipo = result.tipo;
        this.archivosLista = this.formGroupPeticiones.value.archivosArray = this.archivosLista;
    }
}
