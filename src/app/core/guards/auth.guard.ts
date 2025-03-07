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

    const userPerfil = this.authService.userPerfil;
    console.log('AuthGuard: Perfil del usuario:', userPerfil);

    // Rutas permitidas por perfil
    const adminRoutes = ['/alumnos', '/cursos', '/inscripciones', '/usuarios'];
    const userRoutes = ['/cursos', '/inscripciones'];

    // Si es admin, puede acceder a todo
    if (userPerfil === 'admin') {
      return true;
    }

    // Si es usuario, solo puede acceder a las rutas permitidas
    if (
      userPerfil === 'usuario' &&
      userRoutes.some((route) => state.url.startsWith(route))
    ) {
      return true;
    }

    console.log('AuthGuard: Acceso denegado. Redirigiendo...');
    this.router.navigate(['/']);
    return false;
  }
}
