import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



export interface DialogData {
	mensaje: string;
	cancelar: boolean;
}



@Component({
	selector: 'app-componente-alertas',
	templateUrl: './componente-alertas.component.html',
	styleUrls: ['./componente-alertas.component.sass']
})
export class ComponenteAlertasComponent {
	mensaje: string;
	cancelar;

	constructor(
		private dialogRef: MatDialogRef<ComponenteAlertasComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
		) {
			this.mensaje = data.mensaje
			this.cancelar = data.cancelar
		}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
