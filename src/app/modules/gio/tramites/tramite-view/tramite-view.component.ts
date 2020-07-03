import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// Funciones
import { funcionesFormularios } from "./../../../../functions/funciones-formularios";
// firebase
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
// Datos
import { data } from "./../../../../../assets/data/data";
// component
import { DebesIniciarSesionComponent } from "./../../../gio/usuarios/debes-iniciar-sesion/debes-iniciar-sesion.component";


// Servicio de subida
import { FirebaseUploadService } from "./../../../../services/subida/firebase-upload.service";
import { Subida } from "./../../../../services/subida/subida";

// Emitter
import { ToolbarService } from "./../../../../services/comunication/toolbar.service";

export interface UsuarioModel {
    uid: string
    folio: string
    displayName: string
    photoURL: string
    phoneNumber: string
    email: string
    emailVerified: boolean
    address1: string
    address2: string
    cp: number
}


@Component({
    selector: 'app-tramite-view',
    templateUrl: './tramite-view.component.html',
    styleUrls: ['./tramite-view.component.sass']
})
export class TramiteViewComponent implements OnInit {

    usuarioGeneral: UsuarioModel = {
        uid: "",
        folio: "",
        displayName: "",
        photoURL: "",
        phoneNumber: "",
        email: "",
        emailVerified: false,
        address1: "",
        address2: "",
        cp: 12345
    }

    uid: string
    sesion
    destinatario: string
    tramite
    formGroupPeticiones:FormGroup
    color: string
    configuracionDialogo: MatDialogConfig = {}
    
    
    archivosLista = []
    subidaEnCurso:Subida
    mostrarProgreso:boolean = false
    porcentajeProgreso:number = 0
    

    constructor(
        public datos: DatabaseService, 
        public autorizacion: AuthService, 
        private parametros: ActivatedRoute, 
        private _formBuilder: FormBuilder, 
        public dialog: MatDialog, 
        private router: Router, 
        private funcionesFormularios: funcionesFormularios, 
        private subir:FirebaseUploadService, 
        private _toolbarService:ToolbarService
    ) {
        this._toolbarService.dataToolbar.emit({ruta:'tramites-view'})
    }

    ngOnInit() {
        // Datos iniciales
        this.destinatario = this.parametros.snapshot.params.from
        this.color = "rgba(" + data.tramites[this.destinatario].colorRgba + ", 0.3)"
        // Trámite en turno
        this.tramite = data.tramites[this.destinatario].tramites[this.parametros.snapshot.params.id]
        // Crear el folio del trámite
        this.usuarioGeneral.folio = this.funcionesFormularios.generarFolio()
        // Construir el formulario
        this.construirFormulario({})

        this.autorizacion.autorizacion.auth.onAuthStateChanged(data => {
            this.sesion = data
            
            if(data) {
                this.usuarioGeneral.uid = data.uid

                this.datos.datos.database.ref('usuarios/' + this.usuarioGeneral.uid + '/perfil').on('value', snapshot =>{
                    console.log("Usuario data:", snapshot.val())
                    this.construirFormulario(snapshot.val())
                })
            }
        })
        
        // this.autorizacion.gioUsuario.subscribe()
    }

    construirFormulario(data) {
        this.formGroupPeticiones = this._formBuilder.group({
            id: [],
            folio: [this.usuarioGeneral.folio],
            nombreCompleto: [data.displayName, Validators.required],
            calleNumero: [data.address1, Validators.required],
            colonia: [data.address2, Validators.required],
            codigoPostal: [data.cp, Validators.required],
            telefono: [data.phoneNumber, Validators.required],
            correo: [data.email, Validators.required],
            archivosArray: [[]],
            mensaje: ['', Validators.required]
        })
    }
    // -----------------------------------------------------------------------------------------------------
    // Métodos públicos
    // -----------------------------------------------------------------------------------------------------
    procesarFormulario() {
        if (this.sesion) {
            let uid = this.usuarioGeneral.uid
            let id = this.datos.datos.createPushId()
            this.formGroupPeticiones.value.id = id
            let nuevosDatos = this.armarCuerpoMensajeUsuario(uid)
            // Actualizar datos de usuario
            this.actualizarUsuarioFirebase(uid, nuevosDatos)
            // Envíar el trámite a firebase
            this.enviarTramiteFirebase(uid, id)

            console.log("this.archivosLista", this.archivosLista)
        } else {
            this.dialogoDebesIniciarSesion()
        }
    }


    actualizarUsuarioFirebase(uid, datos) {
        let ref = 'usuarios/' + uid + '/perfil'
        // this.datos.datos.database.ref(ref).set(datos)
    }

    enviarTramiteFirebase(uid, id){
        this.formGroupPeticiones.value.archivosArray = this.archivosLista
        let updates = {}
        updates['usuarios/' + uid + '/tramites/' + id] = this.formGroupPeticiones.value
        updates['admin/tramites/' + this.destinatario + '/' + id] = this.formGroupPeticiones.value

        console.log("Updates", updates)

        this.datos.datos.database.ref().update(updates).then(()=>{
            // this.router.navigate(['/tramites-landing'])
        })
    }

    
    armarCuerpoMensajeUsuario(uid) {
        let nuevosDatos: UsuarioModel = {
            uid: uid,
            folio: this.usuarioGeneral.folio,
            displayName: this.formGroupPeticiones.value.nombreCompleto,
            address1: this.formGroupPeticiones.value.calleNumero,
            address2: this.formGroupPeticiones.value.colonia,
            photoURL: "",
            phoneNumber: this.formGroupPeticiones.value.telefono,
            email: this.formGroupPeticiones.value.correo,
            emailVerified: false,
            cp: this.formGroupPeticiones.value.codigoPostal
        }

        return nuevosDatos
    }

   
    adjuntarArchivo(event) {
        let file = event.target.files[0]
        this.subidaEnCurso = new Subida(file)
        this.subir.adjuntarArchivo(this.subidaEnCurso, 'usuarios/')

        // Subscribimos para que al finalizar agregamos el archivo al array
        this.subidaEnCurso.finalizado.subscribe(event=>{
            if(event){

                this.agregarArchivoAlArray(this.subidaEnCurso)
            }
        })
    }

    // Ingresa item al array de archivo, primero lo compone
    agregarArchivoAlArray(item){
        console.log("A subir", item)
        if (item) {
            let archivo = {
                name: item.file.name, 
                date: item.date, 
                size: item.file.size, 
                type: item.file.type, 
                url: item.url
            }
            this.archivosLista.push(archivo)
        }
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
}