import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

// Servicios
import { AuthService } from "./../../../../services/firebase/auth.service";

const routes: Routes = [
  {
      path: '**',
      component: PerfilComponent,
      children: []
  }
];

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 

    MatCheckboxModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule, 
    // Formularios
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PerfilModule { }
