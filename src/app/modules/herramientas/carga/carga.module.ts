import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaComponent } from './carga.component';

// Material
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [CargaComponent],
  exports:[
    CargaComponent
  ],
  imports: [
    CommonModule, 

    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, 

    AngularFireStorageModule,
  ]
})
export class CargaModule { }
