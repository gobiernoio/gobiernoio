import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
// firebase
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
// Dialogo
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ComponenteAlertasComponent } from "./../../../../elementos/componente-alertas/componente-alertas.component";
// Servicios
import { PaginaActualService } from "./../../../../services/comunication/pagina-actual.service";
//Modelos
import { GioUsuario } from "./../../../../modelos/usuario";
@Component({
    selector: 'usuario-registrar',
    templateUrl: './usuario-registrar.component.html',
    styleUrls: ['./usuario-registrar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UsuarioRegistrarComponent {

    registerForm: FormGroup;
    redireccion: string


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
        private autorizacion: AuthService,
        private datos: DatabaseService,
        private router: Router,
        public paginaActual: PaginaActualService
    ) {
        this.redireccionarInicio()
        this.construirFormulario()
    }



    // =============================================================
    //      PROCESAR FORMULARIO
    // =============================================================
    procesarFormulario() {
        console.log("Procesar formulario", this.registerForm.value)
        this.crearUsuario()
    }
    


    // =============================================================
    //      CREAR USUARIO
    // =============================================================
    crearUsuario(){
        this.autorizacion.autorizacion.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password).then(data => {

            let gioUsuario = this.crearElementoUsuario()
            this.actualizarDisplayName()            
            this.guardarPerfilUsuarioEnFirebase(data.user.uid, gioUsuario)

        }).catch(error => {
            this.mostrarErrorRegistro(error)
        })
    }

    guardarPerfilUsuarioEnFirebase(uid, gioUsuario){
        gioUsuario.uid = uid
        let ruta = `usuarios/${uid}/perfil`

        this.datos.datos.database.ref(ruta).set(gioUsuario).then(()=>{
            console.log("GioUsuario", gioUsuario)
        })
    }



    // =============================================================
    //      ARMAR OBJETO USUARIO
    // =============================================================
    crearElementoUsuario(){
        let displayName = this.registerForm.value.displayName
        let email = this.registerForm.value.email
        let admin = false

        return new GioUsuario(displayName, email)
    }



    // =============================================================
    //      ACTUALIZAR DISPLAY NAME EN USUARIO
    // =============================================================
    actualizarDisplayName(){
        console.log("Actualizando el displayName ...")

        let currentUser = this.autorizacion.autorizacion.auth.currentUser
        let nombre = this.registerForm.value.displayName

        let profile = {
            displayName: this.registerForm.value.displayName
        }

        currentUser.updateProfile(profile).then(()=>{
            console.log("Se actualizó el displayName a: " + profile.displayName)
        })
    }

    enviarFormulario() {
        let gioUsuario = this.crearElementoUsuario()
        let password = this.registerForm.value.password;

        this.autorizacion.autorizacion.auth.createUserWithEmailAndPassword(gioUsuario.email, password).then(data => {
            // Si se crea el usuario se actualiza el nombre
            let usuarioActual = this.autorizacion.autorizacion.auth.currentUser
            usuarioActual.updateProfile({displayName: gioUsuario.nombre})
            // Y se guarda en firebase
            this.guardarPerfilUsuarioEnFirebase(data.user.uid, gioUsuario)
        }).catch(error => {
            this.mostrarErrorRegistro(error)
        })
    }

   



    // =============================================================
    //      MOSTRAR ERROR DE REGISTRO
    // =============================================================
    mostrarErrorRegistro(error){
        let tipoDeError = error.code
        let configuracionDialogo: MatDialogConfig = {};

        
        switch (tipoDeError) {
            case "auth/invalid-email":
                configuracionDialogo.data = { mensaje: "El correo electrónico no es valido", cancelar: false }
                break;
            case "auth/weak-password":
                configuracionDialogo.data = { mensaje: "El password es demasiado fácil, intenta usar al menos seis letras.", cancelar: false }
                break;
            case "auth/email-already-in-use":
                configuracionDialogo.data = { mensaje: "Este mail ya está siendo usado en otra cuenta.", cancelar: false }
                break;
            default:
                configuracionDialogo.data = { mensaje: "Ocurrió un error desconocido", cancelar: false }
                break;
        }
        this.dialog.open(ComponenteAlertasComponent, configuracionDialogo);
    }

    

    // =============================================================
    //      REDIRECCIONAR DE INICIO
    // =============================================================
    redireccionarInicio(){
        if (this.paginaActual.getPaginaActual()) {
            this.redireccion = this.paginaActual.getPaginaActual()
        } else {
            this.redireccion = "/"
        }
    }



    // =============================================================
    //      REDIRECCIONAR
    // =============================================================
    redireccionar(){
        this.router.navigate([this.redireccion])
    }



    // =============================================================
    //      ARMAR FORMULARIO
    // =============================================================
    construirFormulario(){
        this.registerForm = this._formBuilder.group({
            displayName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            leidoAceptado: new FormControl('', Validators.required)
        });

        this.registerForm.get('password').valueChanges.subscribe(() => {
            this.registerForm.get('passwordConfirm').updateValueAndValidity()
        });
    }
}


/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
