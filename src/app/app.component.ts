import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
// Sidenav
import { MatSidenav } from "@angular/material";
import { SidenavService } from "./services/comunication/sidenav.service";

import { environment } from "./../environments/environment";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('sidenav', {static:true}) public sidenav: MatSidenav;

    constructor(
        private titleService: Title, 
        public sidenavService:SidenavService, 
    ) {
        // Colocar el título a partir de la configuración en enviroment
        this.titleService.setTitle(environment.titulo)
    }


    ngOnInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }
}