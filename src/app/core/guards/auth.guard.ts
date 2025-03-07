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
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userPerfil = this.authService.userPerfil;
    const adminRoutes = [
      '/alumnos',
      '/clases',
      '/cursos',
      '/inscripciones',
      '/usuarios',
    ];
    const userRoutes = ['/cursos', '/clases', '/inscripciones'];

    if (userPerfil === 'admin') {
      return true;
    }

    if (
      userPerfil === 'usuario' &&
      userRoutes.some((route) => state.url.startsWith(route))
    ) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
