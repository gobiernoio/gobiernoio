import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
// Mapa
import { AgmCoreModule } from '@agm/core';
import {  MAT_DATE_LOCALE, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormularioSesionComponent } from './formulario-sesion.component';
import { MapaModule } from "../../../../elementos/componente-ubicacion/mapa.module";
// import { DebesIniciarSesionComponent } from "./../../../../elementos/debes-iniciar-sesion/debes-iniciar-sesion.component";
import { DebesIniciarSesionModule } from "../../../../elementos/debes-iniciar-sesion/debes-iniciar-sesion.module";

// import { ArchivosComponent } from "./../../../componentes/archivos/archivos.component";
import { ArchivosModule } from "../../../../elementos/archivos/archivos.module";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { environment } from "../../../../../environments/environment";

// funciones
import { funcionesFormularios } from "../../../../funciones/funciones-formularios";

// Servicio Upload
import { FirebaseUploadService } from "../../../../services/subida/firebase-upload.service";

// Modulos mios
import { UbicacionModule } from "../../../herramientas/ubicacion/ubicacion.module";
import { CargaModule } from "../../../herramientas/carga/carga.module";

// Services
import { GeocoderService } from "../../../../services/http/geocoder.service";

const routes: Routes = [
  {
      path: '**',
      component: FormularioSesionComponent,
      children: []
  }
];

@NgModule({
  declarations: [FormularioSesionComponent],
  imports: [
    CommonModule,
  ArchivosModule,
  MapaModule, 
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
    HttpClientModule, 

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
    funcionesFormularios, FirebaseUploadService, GeocoderService
  ],
})
export class FormularioSesionModule { }
