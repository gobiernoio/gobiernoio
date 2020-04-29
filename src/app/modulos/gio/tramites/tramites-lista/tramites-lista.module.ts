import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitesListaComponent } from "./tramites-lista.component";
import { RouterModule, Routes } from "@angular/router";

import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule } from "@angular/material";


const routes:Routes = [
  {
    path: "**",
    component: TramitesListaComponent,
    children: []
  }
]

@NgModule({
  declarations: [TramitesListaComponent],
  imports: [
    CommonModule,
	RouterModule.forChild(routes),

	MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ]
})
export class TramitesListaModule { }
