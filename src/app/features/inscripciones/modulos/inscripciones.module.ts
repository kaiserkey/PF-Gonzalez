import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { ListaInscripcionesComponent } from '../components/lista-inscripciones/lista-inscripciones.component';
import { AbmInscripcionesComponent } from '../components/abm-inscripciones/abm-inscripciones.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListaInscripcionesComponent, AbmInscripcionesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    InscripcionesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class InscripcionesModule {}
