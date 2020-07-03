import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
// firebase
import { AuthService } from "./../../../../services/firebase/auth.service";
import { Router } from "@angular/router";

// Dialog
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ComponenteAlertasComponent } from "./../../../herramientas/componente-alertas/componente-alertas.component";

// Servicio página actual
import { PaginaActualService } from "./../../../../services/comunication/pagina-actual.service";

import { FirebaseAuth } from "@angular/fire";

@Component({
  selector: 'sesion-iniciar',
  templateUrl: './sesion-iniciar.component.html',
  styleUrls: ['./sesion-iniciar.component.scss'],
})
export class SesionIniciarComponent implements OnInit {


    errorMail:boolean;
    errorMailMensaje:string;
    loginForm: FormGroup;
    configuracionDialogo:MatDialogConfig;

    

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private autorizacion: AuthService,
        public dialog: MatDialog,
        private router: Router,
        public paginaActual:PaginaActualService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.configuracionDialogo = {}

        // Login Form
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });


        // this.autorizacion.observandoLogin().
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    iniciarSesion() {
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;

        this.autorizacion.autorizacion.auth.signInWithEmailAndPassword(email, password).then( event => {
            console.log(event)
            // Si el login es correcto, navegamos a la página actual desde el servicio
            this.paginaActual.navegarPaginaActual()

        }).catch( error => {


            switch(error.code) {
                case "auth/invalid-email":
                    this.configuracionDialogo.data = { mensaje: "El correo electrónico es invalido", cancelar: false }
                    break;
                case "auth/user-not-found":
                    this.configuracionDialogo.data = { mensaje: "El usuario ingresado no existe en nuestro sistema", cancelar: false }
                    break;
                case "auth/wrong-password":
                    this.configuracionDialogo.data = { mensaje: "Contraseña incorrecta", cancelar: false }
                    break;
                default:
                    this.configuracionDialogo.data = { mensaje: "Ocurrió un error desconocido", cancelar: false }
                    break;
            }

            const dialogoMapa = this.dialog.open(ComponenteAlertasComponent, this.configuracionDialogo);
        })
    }

    


    olvidePassword():void {

        this.configuracionDialogo.data = {
            mensaje: "Le envíaremos un enlace de recuperación.",
            cancelar: true
        }

        const alertaGenerada = this.dialog.open( ComponenteAlertasComponent, this.configuracionDialogo)

        alertaGenerada.afterClosed().subscribe(result => {

            this.autorizacion.autorizacion.auth.sendPasswordResetEmail(result).then(data=>{

                this.configuracionDialogo.data = {
                    mensaje: "Le hemos envíado un correo de recuperación a "+result,
                    cancelar: false
                }
                this.dialog.open( ComponenteAlertasComponent, this.configuracionDialogo)

            }).catch(error=>{

                switch(error.code) {
                case "auth/invalid-email":
                    this.configuracionDialogo.data = { mensaje: "El correo proporcionado es invalido", cancelar: false }
                    break;
                case "auth/user-not-found":
                    this.configuracionDialogo.data = { mensaje: "El usuario ingresado no existe en nuestro sistema", cancelar: false }
                    break;
                case "auth/argument-error":
                    this.configuracionDialogo.data = { mensaje: "No se envío nada.", cancelar: false }
                    break;
                default:
                    this.configuracionDialogo.data = { mensaje: "Ocurrió un error desconocido", cancelar: false }
                    break;
                }

                this.dialog.open(ComponenteAlertasComponent, this.configuracionDialogo);
            })
        });


        // this.dialog.open(ComponenteAlertasComponent, this.configuracionDialogo);
    }


}
