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
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (
          parsedUser &&
          parsedUser.id &&
          parsedUser.email &&
          parsedUser.role
        ) {
          this.userSubject.next(parsedUser);
        } else {
          this.clearUserData();
        }
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        this.clearUserData();
      }
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );
        if (user) {
          const userData = { id: user.id, email: user.email, role: user.role };
          this.saveUserData(userData);
          this.isLoggedIn = true;
          return userData;
        } else {
          throw new Error('Credenciales incorrectas');
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw new Error('Error al intentar iniciar sesión');
      })
    );
  }

  private saveUserData(userData: any) {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      this.userSubject.next(userData);
    } catch (error) {
      console.error('Error saving user data to localStorage', error);
    }
  }

  logout() {
    this.clearUserData();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  private clearUserData() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  get userRole(): string {
    return this.userSubject.value?.role || 'user';
  }
}
