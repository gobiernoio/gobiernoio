import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminExtraviadosRevisarComponent } from './admin-extraviados-revisar.component';

// Rutas
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path        : '', 
    component   : AdminExtraviadosRevisarComponent
  }
];


@NgModule({
  declarations: [AdminExtraviadosRevisarComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class AdminExtraviadosRevisarModule { }
