import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: false,
})
export class LayoutComponent implements OnInit {
  userName: string | null = null;
  userPerfil: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.userName = user?.nombre || null;
      this.userPerfil = user?.perfil || null;
    });
  }

  logout() {
    this.authService.logout();
  }
}
