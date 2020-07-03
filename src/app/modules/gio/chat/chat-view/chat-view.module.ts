import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatViewComponent } from "./chat-view.component";

// import { FlexLayoutModule } from '@angular/flex-layout';

// Modulos añadidos hay que revisarlos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatMenuModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatSnackBarModule } from '@angular/material';

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { environment } from "./../../../../../environments/environment";

// Servicio Upload
import { FirebaseUploadService } from "./../../../../services/subida/firebase-upload.service";

const routes: Routes = [
  {
      path: '**',
      component: ChatViewComponent,
      children: []
  }
];


@NgModule({
  declarations: [ChatViewComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 

    //firebase
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireStorageModule, 
    AngularFireDatabaseModule, 


    // Modulos a revisar
    // FlexLayoutModule, 
    FormsModule, ReactiveFormsModule, 
    MatToolbarModule, MatMenuModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatSnackBarModule
  ], 
  providers: [FirebaseUploadService]
})
export class ChatViewModule { }
