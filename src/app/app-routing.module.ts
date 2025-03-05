import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/modulos/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./features/alumnos/modulos/alumnos.module').then(
        (m) => m.AlumnosModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./features/cursos/modulos/cursos.module').then(
        (m) => m.CursosModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'clases',
    loadChildren: () =>
      import('./features/clases/modulos/clases.module').then(
        (m) => m.ClasesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./features/inscripciones/modulos/inscripciones.module').then(
        (m) => m.InscripcionesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./features/usuarios/components/usuarios.module').then(
        (m) => m.UsuariosModule
      ),
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
