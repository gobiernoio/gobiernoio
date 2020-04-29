import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./../../../../services/firebase/database.service";

@Component({
  selector: 'app-admin-ambiental-revisar',
  templateUrl: './admin-ambiental-revisar.component.html',
  styleUrls: ['./admin-ambiental-revisar.component.scss']
})
export class AdminAmbientalRevisarComponent implements OnInit {

  extraviadosDatos:any

  constructor(
    private _dS:DatabaseService
  ) {


    this._dS.datos.database.ref('admin/peticiones/ambiente').once('value', data=>{
      console.log(data.val())
      this.extraviadosDatos = data.val()
    })


  }

  ngOnInit() {
  }

}
