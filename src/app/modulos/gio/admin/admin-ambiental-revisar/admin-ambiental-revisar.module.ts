import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAmbientalRevisarComponent } from './admin-ambiental-revisar.component';

// Rutas
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path        : '', 
    component   : AdminAmbientalRevisarComponent
  }
];


@NgModule({
  declarations: [AdminAmbientalRevisarComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class AdminAmbientalRevisarModule { }
