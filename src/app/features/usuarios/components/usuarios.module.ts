import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from '../modulos/lista-usuarios/lista-usuarios.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListaUsuariosComponent],
  imports: [
    CommonModule,
    MatTableModule,
    UsuariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UsuariosModule {}
