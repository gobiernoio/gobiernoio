import { Component } from '@angular/core';
import { Location } from "@angular/common";
// RUTAS
import { Router, Routes } from '@angular/router';
// SERVICIOS
import { ToolbarService } from "../../services/comunication/toolbar.service";
import { SidenavService } from "../../services/comunication/sidenav.service";
import { AuthService } from "../../services/firebase/auth.service";
import { DatabaseService } from "../../services/firebase/database.service";
import { menus } from "./../../../assets/data/menus";



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  // menuPrincipal: any = menus.menuPrincipal
  // menuAdministrador: any = menus.menuAdministrador
  // administrador: any = false
  // usuario
  ruta: string
  dataToolbar: any

  
  constructor(
    private autorizacion: AuthService,
    private _location:Location, 
    private datos: DatabaseService,
    private _toolbar: ToolbarService,
    private _router: Router,
    private _sidenavServiceService: SidenavService
  ) {
    // Cargar datos en toolbar si es un chat
    this._toolbar.dataToolbar.subscribe(data => {
      this.ruta = data.ruta
      this.dataToolbar = data
    })
  }

  

  // sidenavToggle() {
  //   this._sidenavServiceService.open()
  //   // this._sidenavServiceService.toggle()
  // }


  llamarEliminarChat(dataToolbar) {
    let updates = {}

		updates[`chats/${dataToolbar.remitente.uid}/mensajes/${dataToolbar.destinatario.uid}`] = null
		updates[`chats/${dataToolbar.remitente.uid}/misMensajes/${dataToolbar.destinatario.uid}/mensaje`] = null

		updates[`chats/${dataToolbar.destinatario.uid}/mensajes/${dataToolbar.remitente.uid}`] = null
		updates[`chats/${dataToolbar.destinatario.uid}/misMensajes/${dataToolbar.remitente.uid}/mensaje`] = null

		this.eliminarChat(updates)
  }

  eliminarChat(updates) {
    this.datos.datos.database.ref().update(updates).then(data=>{
    })
  }

  // informacionUsuario(uid) {
  //   let ruta = 'usuarios/' + uid + '/perfil/admin'
  //   this.datos.datos.object(ruta).valueChanges().subscribe(data => {
  //     this.administrador = data
  //   })
  // }
}