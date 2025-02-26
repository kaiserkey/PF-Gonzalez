import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ClasesRoutingModule } from './clases-routing.module';
import { ListaClasesComponent } from '../components/lista-clases/lista-clases.component';
import { AbmClasesComponent } from '../components/abm-clases/abm-clases.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListaClasesComponent, AbmClasesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    ClasesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ClasesModule {}
