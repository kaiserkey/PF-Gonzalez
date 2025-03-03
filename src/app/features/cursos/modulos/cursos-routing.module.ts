import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosComponent } from '../components/lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from '../components/abm-cursos/abm-cursos.component';
import { AuthGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'lista-cursos',
    component: ListaCursosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'abm-cursos',
    component: AbmCursosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'abm-cursos/:id',
    component: AbmCursosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
