import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	titulo: string;
	mensaje: string;
}

@Component({
	selector: 'app-debes-iniciar-sesion',
	templateUrl: './debes-iniciar-sesion.component.html',
	styleUrls: ['./debes-iniciar-sesion.component.scss']
})
export class DebesIniciarSesionComponent {

	constructor(public dialogRef: MatDialogRef<DebesIniciarSesionComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

	cancelar(): void {
		this.dialogRef.close();
	}
}