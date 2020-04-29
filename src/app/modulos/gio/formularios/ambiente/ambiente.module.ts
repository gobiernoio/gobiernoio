import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Mapa
import { AgmCoreModule } from '@agm/core';
import { MAT_DATE_LOCALE, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { AmbienteComponent } from './ambiente.component';
import { MapaModule } from "../../../../elementos/componente-ubicacion/mapa.module";
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

const routes: Routes = [
  {
    path: '**',
    component: AmbienteComponent,
    children: []
  }
];

@NgModule({
  declarations: [AmbienteComponent],
  imports: [
    CommonModule,
    ArchivosModule,
    MapaModule,

    RouterModule.forChild(routes),

    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
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
export class AmbienteModule { }
