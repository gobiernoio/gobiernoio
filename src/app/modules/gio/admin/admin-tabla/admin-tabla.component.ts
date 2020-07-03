import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from "./../../../../services/firebase/database.service";
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { tablas } from "./../../../../../assets/data/tablas";

@Component({
	selector: 'app-admin-tabla',
	templateUrl: './admin-tabla.component.html',
	styleUrls: ['./admin-tabla.component.scss']
})
export class AdminTablaComponent implements OnInit {

	tableStructure
	formulario
	displayedColumns:string[]
	dataSource;
	dataTable: any;
	ruta

	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;





	constructor(
		private _dB: DatabaseService,
		private params: ActivatedRoute
	) { }

	ngOnInit() {


		this.params.paramMap.subscribe(data => {

			this.formulario = data['params']['tabla']
			this.tableStructure = tablas[this.formulario]['tableStructure']

			this.displayedColumns = this.armarDisplayColumns(this.tableStructure)
			
			this.traerDatosTabla( this.formulario, tablas[this.formulario]['ruta'])
		})

	}


	armarDisplayColumns(tableStructure){
		let arrayDisplayColumns = []

		tableStructure.forEach(element => {
			arrayDisplayColumns.push(element['key'])	
		})

		return arrayDisplayColumns
	}


	traerDatosTabla(formulario, ruta) {
		this._dB.datos.database.ref(ruta).on('value', snapshot => {
			this.cargarDatos(snapshot.val())
		})
	}



	cargarDatos(data) {

		this.dataTable = Object.values(data);

		this.dataSource = new MatTableDataSource(this.dataTable);

		console.log(this.dataTable)


		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}


	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}


	borrarElemento(id){
		this._dB.datos.database.ref(`admin/formularios/${this.formulario}/${id}`).remove(data=>{
			console.log(data)
		})
	}
}
