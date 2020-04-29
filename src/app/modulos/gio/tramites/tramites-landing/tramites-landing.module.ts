import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitesLandingComponent } from "./tramites-landing.component";
import { RouterModule, Routes } from "@angular/router";

import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule } from "@angular/material";


const routes:Routes = [
  {
    path: "**",
    component: TramitesLandingComponent,
    children: []
  }
]

@NgModule({
  declarations: [TramitesLandingComponent],
  imports: [
    CommonModule,
	RouterModule.forChild(routes),

	MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ]
})
export class TramitesLandingModule { }
