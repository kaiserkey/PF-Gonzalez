import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CursosRoutingModule } from './cursos-routing.module';
import { ListaCursosComponent } from '../components/lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from '../components/abm-cursos/abm-cursos.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListaCursosComponent, AbmCursosComponent],
  imports: [
    CommonModule,
    MatTableModule,
    CursosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CursosModule {}
