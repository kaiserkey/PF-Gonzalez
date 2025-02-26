import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { ListaAlumnosComponent } from '../components/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from '../components/abm-alumnos/abm-alumnos.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListaAlumnosComponent, AbmAlumnosComponent],
  imports: [
    CommonModule,
    MatTableModule,
    AlumnosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AlumnosModule {}
