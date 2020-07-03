import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Mapa
import { AgmCoreModule } from '@agm/core';
import {  MAT_DATE_LOCALE, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormularioSesionComponent, DialogoAlerta } from './formulario-sesion.component';
// import { DebesIniciarSesionComponent } from "./../../../../components/debes-iniciar-sesion/debes-iniciar-sesion.component";
import { DebesIniciarSesionModule } from "./../../usuarios/debes-iniciar-sesion/debes-iniciar-sesion.module";

// import { ArchivosComponent } from "./../../../componentes/archivos/archivos.component";
// import { ArchivosModule } from "../../../../components/archivos/archivos.module";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { environment } from "../../../../../environments/environment";

// funciones
import { funcionesFormularios } from "../../../../functions/funciones-formularios";

// Servicio Upload
import { FirebaseUploadService } from "../../../../services/subida/firebase-upload.service";

// Modulos mios
import { UbicacionModule } from "../../../herramientas/ubicacion/ubicacion.module";
import { CargaModule } from "../../../herramientas/carga/carga.module";

const routes: Routes = [
  {
      path: '**',
      component: FormularioSesionComponent,
      children: []
  }
];

@NgModule({
  declarations: [FormularioSesionComponent, DialogoAlerta],
  entryComponents: [DialogoAlerta], 
  imports: [
    CommonModule,
  // ArchivosModule,
  UbicacionModule, 
  CargaModule, 

	RouterModule.forChild(routes),

  MatProgressBarModule,
  MatDialogModule,
  MatCheckboxModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule, 

  DebesIniciarSesionModule, 
  
    // Formularios
    FormsModule,
    ReactiveFormsModule,

    // Mapa
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBg1h9qOTfHoMU9xd6Wq3GUvuIdQVSX_qs'
    // }),
    //firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [
    { provide: StorageBucket, useValue: 'ecatepecapp.appspot.com' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    funcionesFormularios, FirebaseUploadService
  ],
})
export class FormularioSesionModule { }
