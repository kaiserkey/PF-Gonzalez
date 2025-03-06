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
  displayedColumns = ['nombre', 'curso', 'fechaInscripcion', 'acciones'];
  inscripciones: Inscripcion[] = [];

  constructor(private inscripcionesService: InscripcionesService) {}

  ngOnInit() {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.inscripcionesService.obtenerInscripciones().subscribe({
      next: (inscripciones) => (this.inscripciones = inscripciones),
      error: (error) => console.error('Error al cargar inscripciones:', error),
    });
  }

  eliminarInscripcion(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
      this.inscripcionesService
        .eliminarInscripcion(id)
        .subscribe(() => this.cargarInscripciones());
    }
  }
}
