import { Component, OnInit } from '@angular/core';
import { CursosService, Curso } from '../../../../core/services/cursos.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
  standalone: false,
})
export class ListaCursosComponent implements OnInit {
  displayedColumns = ['nombre', 'horas', 'clases', 'profesor'];
  cursos: Curso[] = [];
  isAdmin = false;

  constructor(
    private cursosService: CursosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.userPerfil === 'admin';
    if (this.isAdmin) {
      this.displayedColumns.push('acciones');
    }
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => (this.cursos = cursos),
      error: (error) => console.error('Error al cargar cursos:', error),
    });
  }

  eliminarCurso(id: number) {
    if (!this.isAdmin) return;

    this.cursosService.eliminarCurso(id).subscribe(() => {
      this.cursos = this.cursos.filter((curso) => curso.id !== id);
    });
  }
}
