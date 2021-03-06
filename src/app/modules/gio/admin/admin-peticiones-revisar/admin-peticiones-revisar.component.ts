import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../../../services/firebase/database.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-admin-peticiones-revisar',
  templateUrl: './admin-peticiones-revisar.component.html',
  styleUrls: ['./admin-peticiones-revisar.component.scss']
})
export class AdminPeticionesRevisarComponent implements OnInit {

  extraviadosDatos:any

  constructor(
    private _dS:DatabaseService, 
    private route:ActivatedRoute

  ) {


    // this._dS.datos.database.ref('admin/peticiones/ambiente').once('value', data=>{
    //   console.log(data.val())
    //   this.extraviadosDatos = data.val()
    // })


    this.route.paramMap.subscribe(data=>{
      let dependencia = data['params']['dependencia']

      this._dS.datos.database.ref(`admin/formularios/peticiones/${dependencia}`).once('value', data=>{
        console.log("Esto encontré", data.val())
        this.extraviadosDatos = data.val()
      })
    })
  }

  ngOnInit() {
  }

}
