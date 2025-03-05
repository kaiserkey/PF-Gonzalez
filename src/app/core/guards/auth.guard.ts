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

    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.userRole;
      console.log('AuthGuard: Rol del usuario:', userRole);

      const allowedRoutesForUser = [
        '/cursos/lista-cursos',
        '/inscripciones/lista-inscripciones',
        '/inscripciones/abm-inscripciones',
        '/inscripciones/abm-inscripciones/:id',
      ];

      if (userRole === 'admin') return true;

      // Usar state.url en lugar de this.router.url
      if (userRole === 'alumno' && allowedRoutesForUser.includes(state.url)) {
        return true;
      }
    } else {
      if (state.url !== '/login') {
        console.log('AuthGuard: Redirigiendo a /login');
        this.router.navigate(['/login']);
      }
      return false;
    }

    return true;
  }
}
