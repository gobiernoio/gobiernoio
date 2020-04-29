import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ChatAdminComponent } from "./chat-admin.component";


// Por revisar
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatCheckboxModule, MatExpansionModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { environment } from "./../../../../../environments/environment";
import { FormularioComponent } from './formulario/formulario.component';

const routes:Routes = [
  {
    path: "**",
    component: ChatAdminComponent,
    children: []
  }
]

@NgModule({
  declarations: [ChatAdminComponent, FormularioComponent],
  imports: [
    MatCardModule,
    CommonModule,
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
    MatExpansionModule,

    // Formularios
    FormsModule,
    ReactiveFormsModule,

    //firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ]
})
export class ChatAdminModule { }
