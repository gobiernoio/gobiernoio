import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteAlertasComponent } from "./componente-alertas.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { 
  MatDialogModule, 
  MatButtonModule, 
  MatFormFieldModule, 
  MatIconModule, 
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [ComponenteAlertasComponent],
  entryComponents: [ComponenteAlertasComponent], 
  imports: [
    CommonModule, 
    MatButtonModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponenteAlertasModule { }
