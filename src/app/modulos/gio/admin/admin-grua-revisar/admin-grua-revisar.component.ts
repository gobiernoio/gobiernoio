import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./../../../../services/firebase/database.service";

@Component({
  selector: 'app-admin-grua-revisar',
  templateUrl: './admin-grua-revisar.component.html',
  styleUrls: ['./admin-grua-revisar.component.scss']
})
export class AdminGruaRevisarComponent implements OnInit {

  extraviadosDatos:any

  constructor(
    private _dS:DatabaseService
  ) {


    this._dS.datos.database.ref('admin/peticiones/grua').once('value', data=>{
      console.log(data.val())
      this.extraviadosDatos = data.val()
    })


  }

  ngOnInit() {
  }

}
