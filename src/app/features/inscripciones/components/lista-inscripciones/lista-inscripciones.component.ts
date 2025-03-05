import { Component, OnInit } from '@angular/core';
import {
  InscripcionesService,
  Inscripcion,
} from '../../../../core/services/inscripciones.service';
import { AuthService } from '../../../../core/services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css'],
  standalone: false,
})
export class ListaInscripcionesComponent implements OnInit {
  displayedColumns = ['nombre', 'curso', 'fechaInscripcion']; // Columnas iniciales
  inscripciones: Inscripcion[] = [];
  isAdmin: boolean = false; // Variable para verificar si es admin

  constructor(
    private inscripcionesService: InscripcionesService,
    private authService: AuthService // Inyectar AuthService
  ) {}

  ngOnInit() {
    this.isAdmin =
      this.authService.userRole == 'admin' ||
      this.authService.userRole == 'alumno'; // Verificar si es admin
    if (this.isAdmin) {
      this.displayedColumns.push('acciones'); // Agregar columna de acciones solo para admin
    }
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.inscripcionesService.obtenerInscripciones().subscribe({
      next: (inscripciones) => (this.inscripciones = inscripciones),
      error: (error) => console.error('Error al cargar inscripciones:', error),
    });
  }

  eliminarInscripcion(id: number) {
    if (
      this.isAdmin &&
      confirm('¿Estás seguro de que deseas eliminar esta inscripción?')
    ) {
      this.inscripcionesService.obtenerInscripciones().subscribe({
        next: (inscripciones) => {
          if (this.isAdmin) {
            this.inscripciones = inscripciones;
          } else {
            this.inscripciones = inscripciones.filter(
              (i) => i.idUsuario === this.authService.obtenerUsuarioLocal()?.id
            );
          }
        },
      });
    }
  }
}
