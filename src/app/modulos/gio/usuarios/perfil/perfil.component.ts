import { Component, OnInit } from '@angular/core';

// Servicios
import { AuthService } from "./../../../../services/firebase/auth.service";
import { DatabaseService } from "./../../../../services/firebase/database.service";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  formulario:FormGroup


  constructor(
    private auth:AuthService, 
    private db:DatabaseService, 
    private _formBuilder: FormBuilder,
  ) {

  
    this.formulario = this._formBuilder.group({
      uid : new FormControl(''), 
      displayName : new FormControl(''), 
      email : new FormControl(''),  
      phoneNumber : new FormControl('')
    })
  }

  ngOnInit() {

    this.auth.autorizacion.authState.subscribe(data=>{
      this.getPerfil(data.uid)
    })
  
  }


  getPerfil(uid){
    this.db.datos.database.ref(`usuarios/${uid}`).on('value', snapshot=>{
      console.log("info", snapshot.val())
      
      this.formulario.setValue({
        uid: snapshot.val()['perfil']['uid'], 
        displayName: snapshot.val()['perfil']['displayName'], 
        email: snapshot.val()['perfil']['email'], 
        phoneNumber: snapshot.val()['perfil']['phoneNumber'], 
      })
    })
  }

  procesarFormulario(){
    console.log("Procesar formulario", this.formulario.value)

    this.db.datos.database.ref('usuarios/eRO0ZfW7ahWhmVzUYpsTNB3GoPN2/perfil').update(this.formulario.value)
  }
}
