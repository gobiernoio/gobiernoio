import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebesIniciarSesionComponent } from "./debes-iniciar-sesion.component";
import { MatCardModule,  MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [DebesIniciarSesionComponent],
  entryComponents: [DebesIniciarSesionComponent],
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
    MatCardModule,
  ], 
  exports:[DebesIniciarSesionComponent]
})
export class DebesIniciarSesionModule { }
