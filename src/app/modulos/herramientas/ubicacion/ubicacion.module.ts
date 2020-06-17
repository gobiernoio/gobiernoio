import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionComponent } from './ubicacion.component';
import { HttpClientModule } from "@angular/common/http";

// Material
import { MatCardModule,  MatDialogModule, MatCheckboxModule,  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatProgressBarModule } from '@angular/material';

// Ubicación como módulo
import { MapaModule } from "./../../../elementos/componente-ubicacion/mapa.module";
import { GeocoderService } from 'src/app/services/http/geocoder.service';

@NgModule({
  declarations: [UbicacionComponent],
  exports: [UbicacionComponent], 
  imports: [
    CommonModule, 
    // Material
    MapaModule, 
    MatDialogModule,
    MatButtonModule,
    MatIconModule, 
    HttpClientModule
  ], 
  providers: [GeocoderService]
})
export class UbicacionModule { }
