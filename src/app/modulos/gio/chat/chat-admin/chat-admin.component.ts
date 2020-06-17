import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';

// Revisar
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

// firebase
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";

@Component({
    selector: 'app-direcciones',
    templateUrl: './chat-admin.component.html',
    styleUrls: ['./chat-admin.component.sass']
})
export class ChatAdminComponent implements OnInit {

    // Declara el acorrdion que se usará para mostrar los dtos
    @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;

    elementoSeleccionado;
    datosDirecciones
    formGroupDirecciones;
    editando = false;


    formulario = [
        {
            nombre: "Id",
            formControlName: "chatId",
            icon: "account_circle",
            type: "input"
        },
        {
            nombre: "Nombre corto",
            formControlName: "nombreCorto",
            icon: "account_circle",
            type: "input"
        }
    ]


    constructor(
        private _formBuilder: FormBuilder,
        public datos: DatabaseService,
    ) { }



    ngOnInit() {
        this.formGroupDirecciones = this._formBuilder.group({
            chatId: ['', Validators.required],
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required]
        })


        let ruta = 'panel/direcciones'
        let referencia = this.datos.datos.database.ref(ruta)
        let lista = this.datos.datos.list(referencia)

        // Obtenemos las peticiones de este usuario y las guardamos a variable iterable
        lista.valueChanges().subscribe(values => {
            this.datosDirecciones = values
        })
    }




    enviarFormulario() {

        console.log(this, this.formGroupDirecciones.value )
        // let uid = this.usuario.uid;
        // let id = this.datos.datos.createPushId()
        // this.formGroupDirecciones.value.id = id;


        // this.datos.datos.database.ref('admin/data/direcciones/' + id).set(this.formGroupDirecciones.value).then(data => {

        //     this.formGroupDirecciones = this._formBuilder.group({
        //         direccionId: ['', Validators.required],
        //         nombre: ['', Validators.required],
        //         descripcion: ['', Validators.required]
        //     })

        // })
    }


    borrarRegistro(id) {
        let ruta = "admin/data/direcciones/" + id;
        this.datos.datos.database.ref(ruta).remove().then(result => {
            console.info(result)
        }).catch(error => {
            console.error(error)
        })
    }


    editarRegistro(id) {
        let ruta = "admin/data/direcciones/" + id;
        let ref = this.datos.datos.database.ref(ruta)
        // let lista = this.datos.datos.list(ref)

        let lista = this.datos.datos.object(ref)


        lista.snapshotChanges().subscribe(elemento => {
            console.info("Elemento obtenido: ", elemento.payload.val())
            let data: any = elemento.payload.val()

            this.formGroupDirecciones = this._formBuilder.group({
                direccionId: [data.direccionId, Validators.required],
                nombre: [data.nombre, Validators.required],
                descripcion: [data.descripcion, Validators.required]
            })

            this.editando = true;
        })
    }
}
