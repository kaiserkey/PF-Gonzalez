import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AuthGuard: Verificando acceso...');

    if (!this.authService.isAuthenticated()) {
      console.log('AuthGuard: Usuario no autenticado, redirigiendo a /login');
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.userPerfil;
    console.log('AuthGuard: Rol del usuario:', userRole);

    if (userRole === 'admin') {
      return true;
    }

    const allowedRoutesForUser = [
      '/cursos/lista-cursos',
      '/inscripciones/lista-inscripciones',
      '/inscripciones/abm-inscripciones',
      '/inscripciones/abm-inscripciones/:id',
    ];

    if (userRole === 'usuario' && allowedRoutesForUser.includes(state.url)) {
      return true;
    }

    console.log('AuthGuard: Acceso denegado. Redirigiendo...');
    this.router.navigate(['/']);
    return false;
  }
}
