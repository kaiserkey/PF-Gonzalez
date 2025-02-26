import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent constructor');
  }

  login() {
    if (!this.email || !this.password) {
      alert('Por favor, complete todos los campos');
      return;
    }

    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe(
        () => {
          this.router.navigate(['/alumnos/lista-alumnos']);
        },
        (error) => {
          alert('Credenciales incorrectas');
        }
      );
  }
}
