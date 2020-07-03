import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionComponent, MapaComponent } from './ubicacion.component';
import { HttpClientModule } from "@angular/common/http";
// Material
import { MatDialogModule,  MatButtonModule, MatIconModule } from '@angular/material';
// AGM Core Module
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [UbicacionComponent, MapaComponent], 
  entryComponents: [MapaComponent], 
  exports: [UbicacionComponent, MapaComponent], 
  imports: [
    CommonModule, 
    MatDialogModule,
    MatButtonModule,
    MatIconModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBg1h9qOTfHoMU9xd6Wq3GUvuIdQVSX_qs'
    }), 
    HttpClientModule
  ], 
  providers: [AgmCoreModule]
})
export class UbicacionModule { }
