import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private userSubject = new BehaviorSubject<any>(this.obtenerUsuarioLocal());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );
        if (!user) {
          throw new Error('Credenciales incorrectas');
        }

        const userData = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.nombre,
        };

        this.guardarUsuarioLocal(userData);
        this.userSubject.next(userData); // Actualizar el BehaviorSubject
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
    this.userSubject.next(null); // Limpiar el BehaviorSubject
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.obtenerUsuarioLocal();
  }

  get userRole(): string {
    return this.userSubject.value?.role || 'user';
  }

  public obtenerUsuarioLocal(): any {
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
    this.userSubject.next(userData); // Actualizar el BehaviorSubject
  }

  private eliminarUsuarioLocal(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null); // Limpiar el BehaviorSubject
  }
}
