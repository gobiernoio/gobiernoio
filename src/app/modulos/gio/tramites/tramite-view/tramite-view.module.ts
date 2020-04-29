import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
// Components
import { TramiteViewComponent } from "./tramite-view.component";
import { DebesIniciarSesionModule } from "./../../../../elementos/debes-iniciar-sesion/debes-iniciar-sesion.module";

// import { FlexLayoutModule } from '@angular/flex-layout';

// Modulos añadidos hay que revisarlos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule,  MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';

// import { ArchivosComponent } from "./../../../componentes/archivos/archivos.component";
import { ArchivosModule } from "./../../../../elementos/archivos/archivos.module";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { environment } from "./../../../../../../src/environments/environment";

// funciones
import { funcionesFormularios } from "./../../../../funciones/funciones-formularios";


// Servicio Upload
import { FirebaseUploadService } from "./../../../../services/subida/firebase-upload.service";

const routes: Routes = [
  {
      path: '**',
      component: TramiteViewComponent,
      children: []
  }
];


@NgModule({
  declarations: [TramiteViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

	// Share
	ArchivosModule,

    //firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,

    DebesIniciarSesionModule, 
    // Modulos a revisar
    // FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule
  ],
  providers:[funcionesFormularios, FirebaseUploadService]
})
export class TramiteViewModule { }
