import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InscripcionesService,
  Inscripcion,
} from '../../../../core/services/inscripciones.service';
import { AuthService } from '../../../../core/services/auth.service';
import { take } from 'rxjs/operators';
import { CursosService } from '../../../../core/services/cursos.service'; // Servicio para obtener cursos
import { AlumnosService } from '../../../../core/services/alumnos.service'; // Servicio para obtener alumnos

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.css'],
  standalone: false,
})
export class AbmInscripcionesComponent implements OnInit {
  inscripcionForm: FormGroup;
  inscripcionId: string | null = null;
  currentUser: any = null;
  cursos: any[] = []; // Lista de cursos
  alumnoNombre: string = ''; // Nombre del alumno

  constructor(
    private fb: FormBuilder,
    private inscripcionesService: InscripcionesService,
    private authService: AuthService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inscripcionForm = this.fb.group({
      nombre: [{ value: '', disabled: true }, [Validators.required]], // Nombre deshabilitado
      idCurso: ['', [Validators.required]], // ID del curso
      fecha: [new Date().toISOString().split('T')[0], [Validators.required]], // Fecha actual por defecto
    });

    this.currentUser = this.authService.obtenerUsuarioLocal();
  }

  ngOnInit() {
    this.inscripcionId = this.route.snapshot.paramMap.get('id');

    // Cargar lista de cursos
    this.cursosService
      .obtenerCursos()
      .pipe(take(1))
      .subscribe({
        next: (cursos) => {
          this.cursos = cursos;
        },
        error: (error) => {
          console.error('Error al obtener cursos:', error);
        },
      });

    // Cargar nombre del alumno si el rol es "alumno"
    if (this.currentUser?.role === 'alumno') {
      this.alumnosService
        .obtenerAlumnoPorId(this.currentUser.id)
        .pipe(take(1))
        .subscribe({
          next: (alumno) => {
            this.alumnoNombre = alumno.nombre;
            this.inscripcionForm.patchValue({ nombre: alumno.nombre });
          },
          error: (error) => {
            console.error('Error al obtener alumno:', error);
          },
        });
    }

    // Cargar datos de la inscripción si estamos editando
    if (this.inscripcionId) {
      this.inscripcionesService
        .obtenerInscripcionPorId(this.inscripcionId)
        .pipe(take(1))
        .subscribe({
          next: (inscripcion) => {
            if (inscripcion?.idUsuario === this.currentUser?.id) {
              this.inscripcionForm.patchValue({
                idCurso: inscripcion.idCurso,
                fecha: inscripcion.fecha,
              });
            } else {
              this.router.navigate(['/inscripciones/lista-inscripciones']);
            }
          },
          error: () =>
            this.router.navigate(['/inscripciones/lista-inscripciones']),
        });
    }
  }

  guardarInscripcion() {
    if (this.inscripcionForm.invalid) return;

    // Obtener todas las inscripciones para generar un nuevo ID
    this.inscripcionesService
      .obtenerInscripciones()
      .pipe(take(1))
      .subscribe({
        next: (inscripciones) => {
          let inscripcionData: Inscripcion;

          if (this.inscripcionId) {
            // Editar inscripción existente
            inscripcionData = {
              id: this.inscripcionId, // Usar el ID existente
              idUsuario: this.currentUser.id,
              idAlumno: this.currentUser.id,
              idCurso: this.inscripcionForm.value.idCurso,
              fecha: this.inscripcionForm.value.fecha,
            };

            this.inscripcionesService
              .actualizarInscripcion(this.inscripcionId, inscripcionData)
              .subscribe(() =>
                this.router.navigate(['/inscripciones/lista-inscripciones'])
              );
          } else {
            // Crear nueva inscripción
            const ultimoId = Math.max(
              ...inscripciones.map((i) => Number(i.id)),
              0
            );
            const nuevoId = (ultimoId + 1).toString(); // Incrementar el ID

            inscripcionData = {
              id: nuevoId, // Asignar el nuevo ID
              idUsuario: this.currentUser.id,
              idAlumno: this.currentUser.id,
              idCurso: this.inscripcionForm.value.idCurso,
              fecha: this.inscripcionForm.value.fecha,
            };

            this.inscripcionesService
              .agregarInscripcion(inscripcionData)
              .subscribe(() =>
                this.router.navigate(['/inscripciones/lista-inscripciones'])
              );
          }
        },
        error: (error) => {
          console.error('Error al obtener inscripciones:', error);
        },
      });
  }

  volver() {
    this.router.navigate(['/inscripciones/lista-inscripciones']);
  }
}
