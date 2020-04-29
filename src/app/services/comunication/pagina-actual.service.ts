import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class PaginaActualService {

	paginaActual: string = "/"

	constructor(
		private router: Router
	) {
	}

	getPaginaActual() {
		return this.paginaActual;
	}

	navegarPaginaActual() {
		this.router.navigate([this.paginaActual])
	}

	setPaginaActual() {
		this.paginaActual = this.router.url
	}

}