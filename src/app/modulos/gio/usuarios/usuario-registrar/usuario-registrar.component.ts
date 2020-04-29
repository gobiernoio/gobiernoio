import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
export class UsuarioRegistrarComponent implements OnInit {

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
        if (this.paginaActual.getPaginaActual()) {
            this.redireccion = this.paginaActual.getPaginaActual()
        } else {
            this.redireccion = "/"
        }
    }


    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            leidoAceptado: ['', Validators.required]
        });

        this.registerForm.get('password').valueChanges.subscribe(() => {
            this.registerForm.get('passwordConfirm').updateValueAndValidity();
        });
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

    guardarPerfilUsuarioEnFirebase(uid, gioUsuario){
        gioUsuario.uid = uid
        gioUsuario.isAdmin = false
        let ruta = `usuarios/${uid}/perfil`
        let ref = this.datos.datos.database.ref(ruta)
        ref.set(gioUsuario).then(data=>{
            this.redireccionar()
        })
    }


    redireccionar(){
        this.router.navigate([this.redireccion])
    }

    crearElementoUsuario(){
        let nombre = this.registerForm.value.name
        let email = this.registerForm.value.email
        let admin = false

        return new GioUsuario(nombre, email, admin)
    }



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
