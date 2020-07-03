import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
// Mapa
// import { AgmCoreModule } from '@agm/core';
import { MatCardModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormularioAnonimoComponent, DialogoAlerta } from './formulario-anonimo.component';


// Firebase
// import { AngularFireModule } from "@angular/fire";
// import { AngularFireDatabaseModule } from "@angular/fire/database";
// import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
// import { environment } from "./../../../../../src/environments/environment";

// funciones
import { funcionesFormularios } from "../../../../functions/funciones-formularios";


// Modulos mios
import { UbicacionModule } from "../../../herramientas/ubicacion/ubicacion.module";
import { CargaModule } from "../../../herramientas/carga/carga.module";

// Services
import { GeocoderService } from "../../../../services/http/geocoder.service";

const routes: Routes = [
  {
      path: '**',
      component: FormularioAnonimoComponent,
      children: []
  }
];

@NgModule({
  declarations: [FormularioAnonimoComponent, DialogoAlerta],
  entryComponents: [DialogoAlerta], 
  imports: [
    CommonModule,
    UbicacionModule, 
    CargaModule, 

	  RouterModule.forChild(routes),

    // MatProgressBarModule,
    // MatDialogModule,
    // MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule, 
    // MatSelectModule,
    // MatStepperModule,
    // MatCardModule,

    // Formularios
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule, 
    //firebase
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireStorageModule,
    // AngularFireDatabaseModule
  ],
  providers: [
    // { provide: StorageBucket, useValue: 'ecatepecapp.appspot.com' },
    funcionesFormularios, 
    GeocoderService, 
    HttpClientModule
  ],
})
export class FormularioAnonimoModule { }
