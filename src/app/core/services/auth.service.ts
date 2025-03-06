import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';
  private userSubject = new BehaviorSubject<any>(this.obtenerUsuarioLocal());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((usuarios) => {
        const user = usuarios.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          throw new Error('Credenciales incorrectas');
        }

        const userData = {
          id: user.id,
          email: user.email,
          perfil: user.perfil, // Se cambió "role" por "perfil"
          nombre: user.nombre, // Se mantiene el nombre
        };

        this.guardarUsuarioLocal(userData);
        this.userSubject.next(userData);
        return userData;
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return throwError(() => new Error('Error al intentar iniciar sesión'));
      })
    );
  }

  logout(): void {
    this.eliminarUsuarioLocal();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.obtenerUsuarioLocal();
  }

  get userPerfil(): string {
    return this.userSubject.value?.perfil || 'usuario'; // Se cambió "role" por "perfil"
  }

  private obtenerUsuarioLocal(): any {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error al obtener usuario del localStorage', error);
      return null;
    }
  }

  private guardarUsuarioLocal(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData));
    this.userSubject.next(userData);
  }

  private eliminarUsuarioLocal(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
