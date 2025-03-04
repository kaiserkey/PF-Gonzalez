import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InscripcionesService,
  Inscripcion,
} from '../../../../core/services/inscripciones.service';
import { AuthService } from '../../../../core/services/auth.service';
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
  currentUser: any = null;
  cursos: any[] = [];
  alumnoNombre: string = '';

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
      nombre: [{ value: '', disabled: true }, [Validators.required]],
      idCurso: ['', [Validators.required]],
      fecha: [new Date().toISOString().split('T')[0], [Validators.required]],
    });

    this.currentUser = this.authService.obtenerUsuarioLocal();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inscripcionId = +id;
    }

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

    const inscripcionData: Inscripcion = {
      id: this.inscripcionId || 0,
      idUsuario: this.currentUser.id,
      idAlumno: this.currentUser.id,
      idCurso: this.inscripcionForm.value.idCurso,
      fecha: this.inscripcionForm.value.fecha,
    };

    if (this.inscripcionId) {
      this.inscripcionesService
        .actualizarInscripcion(this.inscripcionId, inscripcionData)
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

  volver() {
    this.router.navigate(['/inscripciones/lista-inscripciones']);
  }
}
