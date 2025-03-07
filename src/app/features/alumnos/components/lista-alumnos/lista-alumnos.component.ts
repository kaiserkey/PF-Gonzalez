import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  AlumnosService,
  Alumno,
} from '../../../../core/services/alumnos.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
  standalone: false,
})
export class ListaAlumnosComponent implements OnInit {
  displayedColumns = ['nombre', 'perfil', 'sexo'];
  dataSource = new MatTableDataSource<Alumno>([]);
  isAdmin: boolean = false;

  constructor(
    private alumnosService: AlumnosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.userPerfil === 'admin';
    if (this.isAdmin) {
      this.displayedColumns.push('acciones');
    }
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosService.obtenerAlumnos().subscribe({
      next: (alumnos) => (this.dataSource.data = alumnos),
      error: (error) => console.error('Error al cargar alumnos:', error),
    });
  }

  eliminarAlumno(id: number) {
    if (this.isAdmin) {
      this.alumnosService
        .eliminarAlumno(id)
        .subscribe(() => this.cargarAlumnos());
    }
  }
}
