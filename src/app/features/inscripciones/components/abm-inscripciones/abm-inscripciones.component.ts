import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InscripcionesService,
  Inscripcion,
} from '../../../../core/services/inscripciones.service';
import { AuthService } from '../../../../core/services/auth.service'; // Importar AuthService
import { take } from 'rxjs/operators';
import { CursosService } from '../../../../core/services/cursos.service';
import { AlumnosService } from '../../../../core/services/alumnos.service';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.css'],
  standalone: false,
})
export class AbmInscripcionesComponent implements OnInit {
  inscripcionForm: FormGroup;
  inscripcionId: number | null = null;
  alumnos: any[] = []; // Lista de alumnos disponibles
  cursos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inscripcionForm = this.fb.group({
      idAlumno: ['', Validators.required], // Ahora seleccionable
      idCurso: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  volver() {
    this.router.navigate(['/inscripciones/lista-inscripciones']);
  }

  cargarDatos() {
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => (this.cursos = cursos),
      error: (error) => console.error('Error al obtener cursos:', error),
    });

    this.alumnosService.obtenerAlumnos().subscribe({
      next: (alumnos) => (this.alumnos = alumnos),
      error: (error) => console.error('Error al obtener alumnos:', error),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inscripcionId = +id;
      this.inscripcionesService
        .obtenerInscripcionPorId(this.inscripcionId)
        .subscribe({
          next: (inscripcion) => this.inscripcionForm.patchValue(inscripcion),
          error: () =>
            this.router.navigate(['/inscripciones/lista-inscripciones']),
        });
    }
  }

  guardarInscripcion() {
    if (this.inscripcionForm.invalid) return;

    const inscripcionData: Omit<Inscripcion, 'id'> = this.inscripcionForm.value;

    if (this.inscripcionId) {
      this.inscripcionesService
        .actualizarInscripcion(this.inscripcionId, {
          id: this.inscripcionId,
          ...inscripcionData,
        })
        .subscribe(() =>
          this.router.navigate(['/inscripciones/lista-inscripciones'])
        );
    } else {
      this.inscripcionesService
        .agregarInscripcion(inscripcionData)
        .subscribe(() =>
          this.router.navigate(['/inscripciones/lista-inscripciones'])
        );
    }
  }
}
