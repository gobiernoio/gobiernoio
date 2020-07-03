import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatsLandingComponent } from "./chats-landing.component";

// import { FlexLayoutModule } from '@angular/flex-layout';

// Modulos añadidos hay que revisarlos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule,  MatToolbarModule, MatMenuModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatSnackBarModule } from '@angular/material';

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { environment } from "./../../../../../environments/environment";

const routes: Routes = [
  {
      path: '**',
      component: ChatsLandingComponent,
      children: []
  }
];


@NgModule({
  declarations: [ChatsLandingComponent],
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
    MatListModule, MatToolbarModule, MatMenuModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatSnackBarModule
  ]
})
export class ChatsLandingModule { }
