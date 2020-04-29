import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivosComponent } from "./archivos.component";

// Material
import { MatCardModule,  MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [ArchivosComponent],
  entryComponents: [ArchivosComponent],
  imports: [
	CommonModule,

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
  exports: [
	ArchivosComponent
  ]
})
export class ArchivosModule { }
