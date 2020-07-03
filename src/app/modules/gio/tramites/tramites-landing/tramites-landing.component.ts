import { Component } from '@angular/core';
import { data } from "./../../../../../assets/data/data";
// Emitter
import { ToolbarService } from "./../../../../services/comunication/toolbar.service";

@Component({
	selector: 'app-tramites',
	templateUrl: './tramites-landing.component.html',
	styleUrls: ['./tramites-landing.component.sass']
})
export class TramitesLandingComponent {
	direcciones:any
	tramites:any

	constructor(
		private _toolbarService:ToolbarService
	) {
		// this.tramites = data.tramites
		this.direcciones = data.direcciones
		// console.log(this.tramites)
		this._toolbarService.dataToolbar.emit({ruta:'tramites-landing'})
	}
}
