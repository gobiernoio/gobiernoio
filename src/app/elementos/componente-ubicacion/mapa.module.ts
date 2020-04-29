import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from "./mapa.component";
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

// Mapa
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [MapaComponent],
  entryComponents: [MapaComponent],
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,


    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBg1h9qOTfHoMU9xd6Wq3GUvuIdQVSX_qs'
    })
  ],
  exports: [MapaComponent], 
  providers: [AgmCoreModule]
})
export class MapaModule { }
