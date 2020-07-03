import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatSnackBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';

// Componentes
import { UsuarioRegistrarComponent } from './usuario-registrar.component';
// import { AlertaComponent } from "./../../../componentes/componente-alertas/alerta.component";
import { ComponenteAlertasModule } from "./../../../herramientas/componente-alertas/componente-alertas.module";

// Firebase
// import { AngularFireModule } from "@angular/fire";
// import { AngularFireAuthModule } from "@angular/fire/auth";
// import { environment } from "./../../../../../src/environments/environment";

const routes: Routes = [
  {
      path: '**',
      component: UsuarioRegistrarComponent,
      // children: []
  }
];

@NgModule({
  declarations: [
    UsuarioRegistrarComponent, 
    // AlertaComponent
  ],
  // entryComponents: [AlertaComponent], 
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule, 
    MatCheckboxModule, 
    MatDialogModule, 
    MatSelectModule, 
    MatStepperModule,
    
    ComponenteAlertasModule, 

    FormsModule, 
    ReactiveFormsModule

    // Firebase
    // AngularFireModule.initializeApp(environment.firebase), 
    // AngularFireAuthModule
  ]
})
export class UsuarioRegistrarModule { }
