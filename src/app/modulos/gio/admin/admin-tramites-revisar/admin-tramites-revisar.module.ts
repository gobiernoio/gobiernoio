import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTramitesRevisarComponent } from './admin-tramites-revisar.component';

// Rutas
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path        : '', 
    component   : AdminTramitesRevisarComponent
  }
];


@NgModule({
  declarations: [AdminTramitesRevisarComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class AdminTramitesRevisarModule { }
