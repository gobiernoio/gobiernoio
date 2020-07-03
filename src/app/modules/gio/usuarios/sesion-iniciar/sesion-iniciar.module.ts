import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatSnackBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';

// Componentes
import { SesionIniciarComponent } from "./sesion-iniciar.component";
import { ComponenteAlertasModule } from "./../../../herramientas/componente-alertas/componente-alertas.module";

const routes: Routes = [
  {
      path: '**',
      component: SesionIniciarComponent,
      children: []
  }
];

@NgModule({
  declarations: [
    SesionIniciarComponent, 
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    
    MatButtonModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule, 
    MatSnackBarModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ComponenteAlertasModule
  ], 
  exports: [
    SesionIniciarComponent
  ]
})
export class SesionIniciarModule { }
