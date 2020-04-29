import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./../../../../services/firebase/database.service";

@Component({
  selector: 'app-admin-extraviados-revisar',
  templateUrl: './admin-extraviados-revisar.component.html',
  styleUrls: ['./admin-extraviados-revisar.component.scss']
})
export class AdminExtraviadosRevisarComponent implements OnInit {

  extraviadosDatos:any

  constructor(
    private _dS:DatabaseService
  ) {


    this._dS.datos.database.ref('admin/peticiones/extraviados').on('value', data=>{
      console.log(data.val())
      this.extraviadosDatos = data.val()
    })


  }

  ngOnInit() {
  }



  eliminarItem(item) {
    console.log("Vamos a eliminar", item.key)
    
    this._dS.datos.database.ref(`admin/peticiones/extraviados/${item.key}`).remove().then(data => {
      console.log("Algo se eliminó", data)
    })
  }

}
