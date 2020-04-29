import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { PeticionesLandingComponent } from './peticiones-landing.component';


const routes: Routes = [
  {
      path: '**',
      component: PeticionesLandingComponent,
      children: []
  }
];


@NgModule({
  declarations: [PeticionesLandingComponent],
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatExpansionModule, 
    MatIconModule, 
    RouterModule.forChild(routes), 
  ]
})
export class PeticionesLandingModule { }
