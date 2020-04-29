import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from "./portada.component";
import { PortadaPersonalizadaComponent } from "./../portada-personalizada/portada-personalizada.component";


// Rutas
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path        : '', 
    component   : PortadaComponent
  }
];

@NgModule({
  declarations: [PortadaComponent, PortadaPersonalizadaComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class PortadaModule { }
