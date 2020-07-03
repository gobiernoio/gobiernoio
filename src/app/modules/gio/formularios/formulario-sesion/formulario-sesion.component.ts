// 1602 9361
import { Component, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// Components
import { DebesIniciarSesionComponent } from "./../../../gio/usuarios/debes-iniciar-sesion/debes-iniciar-sesion.component";

// Servicios
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
import { PaginaActualService } from "./../../../../services/comunication/pagina-actual.service";
// Modelos
import { GioUsuario } from "./../../../../models/usuario";
// Emitter
import { ToolbarService } from "./../../../../services/comunication/toolbar.service";
// DATA
import { formularios } from "./../../../../../assets/data/formularios";
@Component({
    selector: 'app-tramites',
    templateUrl: './formulario-sesion.component.html',
    styleUrls: ['./formulario-sesion.component.scss']
})
export class FormularioSesionComponent {
    formGroup:FormGroup
    ubicacion: any = {}
    archivosLista = []

    usuarioPerfilGio: GioUsuario = new GioUsuario("", "", false)
    usuario:any = null
    direcciones
    formulario
    



    // Constructor
    constructor(
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
        public datos: DatabaseService,
        public autorizacion: AuthService,
        private router: Router,
        public paginaActual: PaginaActualService,
        private _toolbarService:ToolbarService, 
        private parametros: ActivatedRoute,
        private _matDialog: MatDialog, 
    ) {
        this.construirPagina()
        
        // Emisor
        this._toolbarService.dataToolbar.emit({ruta:this.formulario['route']})
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

        if(this.formGroup.value.direccion1){
            usuarioActualizado.direccion1 = this.formGroup.value.direccion1
        }

        if(this.formGroup.value.direccion2){
            usuarioActualizado.direccion2 = this.formGroup.value.direccion2
        }
        usuarioActualizado.fotoUrl = ""
        if(this.formGroup.value.telefonoLocal){
            usuarioActualizado.telefonoLocal = this.formGroup.value.telefonoLocal
        }
        usuarioActualizado.email = this.formGroup.value.email
        usuarioActualizado.emailVerificado = false
        
        if(this.formGroup.value.cp){
            usuarioActualizado.cp = this.formGroup.value.cp
        }

        return usuarioActualizado
    }


    // ===============================================================================
	// 			CONSTRUIR PÁGINA
	// ===============================================================================
    construirPagina(){
        this.parametros.paramMap.subscribe(data => {
            let formulario = data['params']['formulario']
            this.formulario = formularios[formulario]

            this.construirFormulario(formulario)
        })

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
    construirFormulario(formulario) {
        let grupo = {}
        formularios[formulario].campos.forEach(campo=>{
            
            if(campo.formularioElement == true) {
                console.log("Se agrega", campo.formControlName)
                grupo[campo.formControlName]=new FormControl('', Validators.required)
            }

        })

        this.formGroup = this._formBuilder.group(grupo)
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
            console.log("Actualizaciones", updates)
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

        if(this.usuario){
            let uid = this.usuario['uid']
            let perfilUsuarioActualizado: GioUsuario = this.componerDatosUsuario(pushId)
            
            let updates = {}

            updates[`usuarios/${uid}/perfil`] = perfilUsuarioActualizado
            updates[`usuarios/${uid}/${this.formulario['databaseUrlUser']}/${pushId}`] = values

            if(destinatario){
                updates[`${this.formulario['databaseUrlAdmin']}/${destinatario}/${pushId}`] = values
            } else {
                updates[`${this.formulario['databaseUrlAdmin']}/${pushId}`] = values
            }

            return updates    
        } else {
            
            let updates = {}

            if(destinatario){
                updates[`${this.formulario['databaseUrlAdmin']}/${destinatario}/${pushId}`] = values
            } else {
                updates[`${this.formulario['databaseUrlAdmin']}/${pushId}`] = values
            }

            return updates
        }
        
    }


    // =============================================================
    //      GUARDAR EN LA BASE DE DATOS
    // =============================================================
    enviarDatabase(updates) {
        this.datos.datos.database.ref().update(updates).then((() => {
            this.despuesDeEnviar()
        }))
    }


    // =============================================================
    //      DESPUÉS DE ENVIAR
    // =============================================================
    despuesDeEnviar() {
        this.formGroup.reset()
        this.abrirDialogo()
    }


    // =============================================================
    //      ABRIR DIALOGO
    // =============================================================
    abrirDialogo(): void {
        const dialogRef = this._matDialog.open(DialogoAlerta, {
            width: '250px'
            // data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.router.navigate(['/'])
        });
    }
}


@Component({
    selector: 'dialogo-alerta',
    templateUrl: 'dialogo-alerta.html'
})
export class DialogoAlerta {

    constructor(
        public dialogRef: MatDialogRef<DialogoAlerta>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { 
        this.data = {
            titulo: "Formulario enviado", 
            mensaje: "Su formulario se ha envíado con éxito.", 
            resultado: true
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
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