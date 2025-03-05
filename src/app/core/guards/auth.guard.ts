import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.userRole;
      if (userRole === 'admin') {
        return true; // Permite acceso completo
      } else {
        this.router.navigate(['/alumnos/lista-alumnos']); // Redirige a otra ruta
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
