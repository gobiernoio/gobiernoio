import { Component, OnInit } from '@angular/core';

// Angular Material
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatabaseService } from 'src/app/services/firebase/database.service';

@Component({
	selector: 'app-menus',
	templateUrl: './menus.component.html',
	styleUrls: ['./menus.component.scss']
})
export class MenusComponent {
	formGroup:FormGroup
	formGroupBusqueda:FormGroup
	menus
	formulario = [
		{
			tipo: "input", 
			formularioElement: true,
			classDiv: "col-12", 
			matLabel: "Enlace", 
			formControlName: "enlace", 
			matIcon: "link", 
			matError: "El enlace es requerido"
		}, 
		{
			tipo: "input", 
			formularioElement: true,
			classDiv: "col-12", 
			matLabel: "Icono", 
			formControlName: "icono", 
			matIcon: "insert_emoticon", 
			matError: "El icono es requerido"
		}, 
		{
			tipo: "input", 
			formularioElement: true,
			classDiv: "col-12", 
			matLabel: "Texto", 
			formControlName: "texto", 
			matIcon: "text_format", 
			matError: "El texto es requerido"
		}
	]
	todo = []
	done = []

	constructor(
		private _formBuilder: FormBuilder,
		public datos: DatabaseService,
	) {
		this.traerMenus()
		this.construirFormulario(this.formulario)
	}


	drop(event: CdkDragDrop<string[]>) {
		console.log("event:", event)
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {

			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}
	}


	// =============================================================
    //      CONSTRUIR FORMULARIO
    // =============================================================
    construirFormulario(formulario) {
        let grupo = {}
        formulario.forEach(campo=>{
            
            if(campo.formularioElement == true) {
                grupo[campo.formControlName]=new FormControl('', Validators.required)
            }

        })

		this.formGroup = this._formBuilder.group(grupo)
		
		this.formGroupBusqueda = this._formBuilder.group({
			usuarioId : new FormControl('', Validators.required)
		})
	}
	

	// =============================================================
    //      PROCESAR FORMULARIO
    // =============================================================
    procesarFormulario() {

        if(this.formGroup.valid){			
			this.datos.datos.database.ref('admin/data/menus').push(this.formGroup.value, data=>{
				console.log("Se envío", data)
			})
        }

	}
	

	// =============================================================
    //      TRAER MENUS
    // =============================================================
    traerMenus(){
		this.datos.datos.database.ref('admin/data/menus').on('value', snapshot =>{
			this.armarArray(snapshot.val())
		})
	}


	// =============================================================
    //      BUSCAR USUARIO
    // =============================================================
	buscarUsuario(){
		console.log("Buscar", this.formGroupBusqueda.value)

		this.datos.datos.database.ref(`usuarios/${this.formGroupBusqueda.value.usuarioId}/menu`).on('value', snapshot => {
			console.log("Snapshot", snapshot.val())
		})
	}
	

	armarArray(data){
		let miArray:any = []

		Object.entries(data).forEach(
			([key, value]) => {
				// let objeto = {
				// 	enlace: value['enlace'], 
				// 	icon: value['icon'], 
				// 	texto: value['texto']
				// }

				miArray.push(value)
			}
		);

		console.log("miArray", miArray)
		this.done = miArray
		this.menus = miArray

		// for (let index = 0; index < data.length; index++) {
		// 	const element = data[index];
		// 	console.log(element)	
		// }
		

	}

	imprimir(data){
		console.log("imprimiendo data", data.data)
	}
}
