import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
        if (user) {
          const userData = { id: user.id, email: user.email, role: user.role };
          this.guardarUsuarioLocal(userData);
          return userData;
        } else {
          throw new Error('Credenciales incorrectas');
        }
      }),
      catchError((error) => {
        console.error('Login fallido:', error);
        throw new Error('Error al intentar iniciar sesión');
      })
    );
  }

  logout() {
    this.eliminarUsuarioLocal();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.obtenerUsuarioLocal();
  }

  get userRole(): string {
    return this.userSubject.value?.role || 'user';
  }

  private obtenerUsuarioLocal(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private guardarUsuarioLocal(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
    this.userSubject.next(userData);
  }

  private eliminarUsuarioLocal() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
