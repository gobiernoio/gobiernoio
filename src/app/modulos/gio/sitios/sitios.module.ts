import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SitiosComponent } from "./sitios.component";

const routes: Routes = [
  {
      path: '**',
      component: SitiosComponent,
      children: []
  }
];

@NgModule({
  declarations: [SitiosComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class SitiosModule { }
