// 1602 9361
import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
// Components
import { DebesIniciarSesionComponent } from "./../../../../elementos/debes-iniciar-sesion/debes-iniciar-sesion.component";

// Servicios
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
import { PaginaActualService } from "./../../../../services/comunication/pagina-actual.service";
// Modelos
import { GioUsuario } from "./../../../../modelos/usuario";
// Emitter
import { ToolbarService } from "./../../../../services/comunication/toolbar.service";
// DATA
import { formularios } from "./../../../../../assets/data/formularios";
@Component({
    selector: 'app-tramites',
    templateUrl: './peticiones-formulario.component.html',
    styleUrls: ['./peticiones-formulario.component.scss']
})
export class PeticionesFormularioComponent {
    urlDatabase:string
    usuarioPerfilGio: GioUsuario = new GioUsuario("", "", false)
    formGroup:FormGroup;
    ubicacion: any = {}
    archivosLista = [];
    usuario
    direcciones
    formulario:any = formularios.peticiones
    



    // Constructor
    constructor(
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
        public datos: DatabaseService,
        public autorizacion: AuthService,
        private router: Router,
        public paginaActual: PaginaActualService,
        private _toolbarService:ToolbarService
    ) {
        // Emisor
        this.urlDatabase = formularios.peticiones.url
        this._toolbarService.dataToolbar.emit({ruta:'peticiones-landing'})
        this.construirFormulario()
        this.traerDirecciones()
        this.paginaActual.setPaginaActual();

        this.autorizacion.autorizacion.auth.onAuthStateChanged(data=>{
            if (data) {
                this.llenarFormularioSiExistePerfilDeUsuario(data.uid)
                this.usuario = data
            }
        })
    }


    // Comprueba usuario y construye formulario con el data recibido:  Recibe UID como parametro
    llenarFormularioSiExistePerfilDeUsuario(uid) {
        let referencia = this.datos.datos.database.ref(`usuarios/${uid}/perfil`)

        this.datos.datos.object(referencia).snapshotChanges().subscribe(data => {
            if(data.payload.val()) {
                this.llenarFormulario(data.payload.val())
            }
        })
    }


    


    // Arma el mensaje con datos + formulario
    componerDatosUsuario(pushId) {
        let usuarioActualizado = new GioUsuario("", "", false)
        this.formGroup.value.id = pushId
        let uid = this.usuario.uid

        usuarioActualizado.uid = uid
        usuarioActualizado.nombre = this.formGroup.value.nombre
        usuarioActualizado.direccion1 = this.formGroup.value.direccion1
        usuarioActualizado.direccion2 = this.formGroup.value.direccion2
        usuarioActualizado.fotoUrl = ""
        usuarioActualizado.telefonoLocal = this.formGroup.value.telefonoLocal
        usuarioActualizado.email = this.formGroup.value.email
        usuarioActualizado.emailVerificado = false
        usuarioActualizado.cp = this.formGroup.value.cp

        return usuarioActualizado
    }


    // =============================================================
    //      TRAER DIRECCIONES
    // =============================================================
    traerDirecciones(){
        this.datos.traerDirecciones().subscribe(data => {
            this.direcciones = data
        })
    }


    // =============================================================
    //      CONSTRUIR FORMULARIO
    // =============================================================
    construirFormulario() {
        let grupo = {}
        formularios.peticiones.campos.forEach(campo=>{
            grupo[campo.formControlName]=new FormControl('', Validators.required)
        })


        // this.formGroup = this._formBuilder.group({
        //     nombre: new FormControl('', Validators.required), 
        //     direccion1: new FormControl('', Validators.required), 
        //     direccion2: new FormControl('', Validators.required), 
        //     cp: new FormControl('', Validators.required), 
        //     telefonoLocal: new FormControl('', Validators.required), 
        //     email: new FormControl('', Validators.required), 
        //     destinatario: new FormControl('', Validators.required), 
        //     archivosArray: [[]], 
        //     ubicacion: [], 
        //     mensaje: new FormControl('', Validators.required), 
        // })

        this.formGroup = this._formBuilder.group(grupo)

        console.log("formGroup", this.formGroup)
    }


    // =============================================================
    //      PROCESAR FORMULARIO
    // =============================================================
    procesarFormulario() {
        
        
        if(this.formGroup.valid){
            let id = this.datos.datos.createPushId()
            let destinatario = this.formGroup.value.destinatario            
            this.formGroup.value.id = id
            this.formGroup.value.coordenadas = this.ubicacion
            this.formGroup.value.archivosArray = this.archivosLista
            let updates = this.armarUpdates(id, destinatario, this.formGroup.value)
            this.enviarDatabase(updates)
        }

    }


    // =============================================================
    //      LLENAR FORMULARIO
    // =============================================================
    llenarFormulario(data){
        if(data){
            this.formGroup.patchValue({
                nombre: data.nombre, 
                direccion1: data.direccion1, 
                direccion2: data.direccion2, 
                cp: data.cp, 
                telefonoLocal: data.telefonoLocal, 
                email: data.email
            })
        }
    }


    // =============================================================
    //      ESCUCHAR CARGA DE ARCHIVOS
    // =============================================================
    leerArchivos(event) {
        this.archivosLista = event
    }
    

    // =============================================================
    //      ESCUCHAR UBICACIÓN
    // =============================================================
    leerPropagacion(event) {
        this.ubicacion = event
    }


    // =============================================================
    //      ARMAR UPDATES
    // =============================================================
    armarUpdates(pushId, destinatario, values) {
        let uid = this.usuario['uid']
        let perfilUsuarioActualizado: GioUsuario = this.componerDatosUsuario(pushId)
        
        return {
            [`usuarios/${uid}/perfil`] : perfilUsuarioActualizado, 
            [`usuarios/${uid}/${this.urlDatabase}/${pushId}`] : values, 
            [`${this.urlDatabase}/${destinatario}/${pushId}`] : values
        }

    }


    // =============================================================
    //      GUARDAR EN LA BASE DE DATOS
    // =============================================================
    enviarDatabase(updates) {
        this.datos.datos.database.ref().update(updates).then((() => {
            // this.despuesDeEnviar()
        }))
    }


    // =============================================================
    //      DESPUÉS DE ENVIAR
    // =============================================================
    despuesDeEnviar() {
        this.formGroup.reset()
        // this.abrirDialogo()
    }
}
// // Adjuntar de mi biblioteca
// llamarAdjuntar() {
//     let configuracionDialogo: MatDialogConfig = {}
//     configuracionDialogo.width = "100%"
//     configuracionDialogo.minWidth = "100%"

//     const dialogoMapa = this.dialog.open(ArchivosComponent, configuracionDialogo);

//     dialogoMapa.afterClosed().subscribe(result => {
//         if (result) {
//             this.insertarRegreso(result)
//         } else {
//             console.log("No hay regreso de información")
//         }
//     });
// }


// // Insertar al ArrayArchivos el archivo retornado por mi biblioteca
// insertarRegreso(result) {
//     const dataInicial = {
//         progreso: 0,
//         barraProgreso: false,
//         datos: false,
//         nombre: "",
//         url: ""
//     }
//     let idTemporal = (this.formGroup.value.archivosArray.push(dataInicial)) - 1;
//     this.formGroup.value.archivosArray[idTemporal].datos = true;
//     this.formGroup.value.archivosArray[idTemporal].url = result.url;
//     this.formGroup.value.archivosArray[idTemporal].nombre = result.nombre;
//     this.formGroup.value.archivosArray[idTemporal].size = result.size;
//     this.formGroup.value.archivosArray[idTemporal].tipo = result.tipo;
//     this.archivosLista = this.formGroup.value.archivosArray = this.archivosLista;
// }

// // Función que llama al dialogo en caso de no haber sesión
// dialogoDebesIniciarSesion(): void {
//     const dialogRef = this.dialog.open(DebesIniciarSesionComponent, {
//         width: '350px',
//         data: { name: "Alberto", animal: "Gato" }
//     })

//     dialogRef.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
//     })
// }

// CAMBIOS ULTIMOS