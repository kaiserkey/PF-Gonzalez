import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClasesComponent } from '../components/lista-clases/lista-clases.component';
import { AbmClasesComponent } from '../components/abm-clases/abm-clases.component';
import { AuthGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'lista-clases',
    component: ListaClasesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'abm-clases',
    component: AbmClasesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'abm-clases/:id',
    component: AbmClasesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesRoutingModule {}
