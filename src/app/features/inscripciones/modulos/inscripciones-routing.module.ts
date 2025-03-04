import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInscripcionesComponent } from '../components/lista-inscripciones/lista-inscripciones.component';
import { AbmInscripcionesComponent } from '../components/abm-inscripciones/abm-inscripciones.component';
import { AuthGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'lista-inscripciones',
    component: ListaInscripcionesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'abm-inscripciones',
    component: AbmInscripcionesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'abm-inscripciones/:id',
    component: AbmInscripcionesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesRoutingModule {}
