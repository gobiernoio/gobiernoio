import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPeticionesRevisarComponent } from './admin-peticiones-revisar.component';

// Rutas
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path        : '', 
    component   : AdminPeticionesRevisarComponent
  }
];


@NgModule({
  declarations: [AdminPeticionesRevisarComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class AdminPeticionesRevisarModule { }
