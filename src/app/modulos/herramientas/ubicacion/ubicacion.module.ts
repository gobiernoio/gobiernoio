import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionComponent } from './ubicacion.component';

// Material
import { MatCardModule,  MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';

// Ubicación como módulo
import { MapaModule } from "./../../../elementos/componente-ubicacion/mapa.module";

@NgModule({
  declarations: [UbicacionComponent],
  exports: [UbicacionComponent], 
  imports: [
    CommonModule, 
    // Material
    MapaModule, 
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UbicacionModule { }
