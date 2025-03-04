import { Component, OnInit } from '@angular/core';
import {
  InscripcionesService,
  Inscripcion,
} from '../../../../core/services/inscripciones.service';
import { take } from 'rxjs/operators';

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

  cargarInscripciones() {
    this.inscripcionesService
      .obtenerInscripciones()
      .pipe(take(1))
      .subscribe({
        next: (inscripciones) => {
          console.log('Inscripciones obtenidas:', inscripciones);
          this.inscripciones = inscripciones;
        },
        error: (error) => {
          console.error('Error al obtener las inscripciones:', error);
        },
      });
  }

  eliminarInscripcion(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
      this.inscripcionesService
        .eliminarInscripcion(id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.inscripciones = this.inscripciones.filter(
              (inscripcion) => inscripcion.id !== id
            );
          },
          error: () => console.error('Error al eliminar la inscripción'),
        });
    }
  }
}
