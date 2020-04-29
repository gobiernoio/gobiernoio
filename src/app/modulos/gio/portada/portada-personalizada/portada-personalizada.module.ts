import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaPersonalizadaComponent } from "./portada-personalizada.component";

// Rutas
import { Routes, RouterModule } from '@angular/router';

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { environment } from "./../../../../../environments/environment";

export const routes: Routes = [
  {
    path        : '', 
    component   : PortadaPersonalizadaComponent
  }
];

@NgModule({
  declarations: [PortadaPersonalizadaComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 

    //firebase
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireStorageModule, 
    AngularFireDatabaseModule, 
  ]
})
export class PortadaPersonalizadaModule { }
