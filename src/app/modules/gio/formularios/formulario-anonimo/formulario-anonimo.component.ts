import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
// Servicios
import { DatabaseService } from "../../../../services/firebase/database.service";
import { PaginaActualService } from "../../../../services/comunication/pagina-actual.service";
import { ToolbarService } from "../../../../services/comunication/toolbar.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { GeocoderService } from "../../../../services/http/geocoder.service";

@Component({
    selector: 'app-formulario-anonimo',
    templateUrl: './formulario-anonimo.component.html',
    styleUrls: ['./formulario-anonimo.component.scss']
})
export class FormularioAnonimoComponent {
    formGroupPeticiones: FormGroup;
    ubicacion: any = {}
    archivosLista = [];

    // Constructor
    constructor(
        private _formBuilder: FormBuilder,
        public datos: DatabaseService,
        private router: Router,
        public paginaActual: PaginaActualService,
        private _toolbarService: ToolbarService,
        private _matDialog: MatDialog, 
        private geoCode:GeocoderService
    ) {
        // Emisor
        this._toolbarService.dataToolbar.emit({ ruta: 'formulario-anonimo' })
        this.construirFormulario()
    }


    // =============================================================
    //      CONSTRUIR FORMULARIO
    // =============================================================
    construirFormulario() {
        this.formGroupPeticiones = this._formBuilder.group({
            id: new FormControl(''), 
            archivosArray: new FormControl([]), 
            coordenadas: new FormControl([]), 
            mensaje: new FormControl('', [Validators.required, Validators.minLength(15)])
        })
    }


    // =============================================================
    //      PROCESAR FORMULARIO
    // =============================================================
    procesarFormulario() {
        if(this.formGroupPeticiones.valid){
            let id = this.datos.datos.createPushId()
            this.formGroupPeticiones.value.id = id
            this.formGroupPeticiones.value.coordenadas = this.ubicacion
            this.formGroupPeticiones.value.archivosArray = this.archivosLista
            let updates = this.armarUpdates(id, this.formGroupPeticiones.value)
            this.enviarDatabase(updates)
        }
    }

    // =============================================================
    //      ARMAR UPDATES
    // =============================================================
    armarUpdates(id, values) {
        
        return {
            [`admin/formularios/denuncia_anonima/${id}`]: values
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
        this.formGroupPeticiones.reset()
        this.abrirDialogo()
    }

    // =============================================================
    //      ESCUCHAR UBICACIÓN
    // =============================================================
    leerPropagacion(event) {
        this.ubicacion = event
    }

    // =============================================================
    //      ESCUCHAR CARGA DE ARCHIVOS
    // =============================================================
    leerArchivos(event) {
        console.log("El event que regresa", event)
        this.archivosLista = event
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
            mensaje: "Su denuncia anónima se ha envíado con éxito.", 
            resultado: true
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}