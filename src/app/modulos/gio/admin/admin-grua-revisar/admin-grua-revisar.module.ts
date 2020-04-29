import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGruaRevisarComponent } from './admin-grua-revisar.component';

// Rutas
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path        : '', 
    component   : AdminGruaRevisarComponent
  }
];


@NgModule({
  declarations: [AdminGruaRevisarComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class AdminGruaRevisarModule { }
