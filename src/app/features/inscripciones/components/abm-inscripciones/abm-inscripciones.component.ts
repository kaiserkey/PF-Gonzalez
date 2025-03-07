import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService, Inscripcion } from '../../../../core/services/inscripciones.service';
import { AuthService } from '../../../../core/services/auth.service'; // Importar AuthService
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
  alumnos: { id: number; nombre: string }[] = []; // Lista de alumnos con tipado
  cursos: { id: number; nombre: string }[] = [];  // Lista de cursos con tipado
  idUsuario: number = 0; // Almacenar ID del usuario autenticado

  constructor(
    private fb: FormBuilder,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private authService: AuthService, // Inyectar AuthService
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inscripcionForm = this.fb.group({
      idAlumno: ['', Validators.required],
      idCurso: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  ngOnInit() {
    this.obtenerUsuarioAutenticado();
    this.cargarDatos();
  }

  obtenerUsuarioAutenticado() {
    this.idUsuario = this.authService.obtenerUsuarioLocal().id; // Obtener ID del usuario autenticado
  }

  cargarDatos() {
    // Obtener lista de cursos
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => (this.cursos = cursos),
      error: (error) => console.error('Error al obtener cursos:', error),
    });

    // Obtener lista de alumnos y luego verificar si estamos editando
    this.alumnosService.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.cargarInscripcion(+id);
        }
      },
      error: (error) => console.error('Error al obtener alumnos:', error),
    });
  }

  cargarInscripcion(id: number) {
    this.inscripcionId = id;
    this.inscripcionesService.obtenerInscripcionPorId(id).subscribe({
      next: (inscripcion) => {
        if (!inscripcion) {
          this.router.navigate(['/inscripciones/lista-inscripciones']);
          return;
        }
        this.inscripcionForm.patchValue({
          idAlumno: inscripcion.idAlumno,
          idCurso: inscripcion.idCurso,
          fecha: inscripcion.fecha,
        });
      },
      error: () => this.router.navigate(['/inscripciones/lista-inscripciones']),
    });
  }

  guardarInscripcion() {
    if (this.inscripcionForm.invalid) return;

    const inscripcionData: Omit<Inscripcion, 'id'> = {
      idAlumno: this.inscripcionForm.value.idAlumno,
      idCurso: this.inscripcionForm.value.idCurso,
      fecha: this.inscripcionForm.value.fecha,
      idUsuario: this.idUsuario, // Agregar ID del usuario autenticado
    };

    if (this.inscripcionId) {
      this.inscripcionesService
        .actualizarInscripcion(this.inscripcionId, { id: this.inscripcionId, ...inscripcionData })
        .subscribe(() => this.router.navigate(['/inscripciones/lista-inscripciones']));
    } else {
      this.inscripcionesService
        .agregarInscripcion(inscripcionData)
        .subscribe(() => this.router.navigate(['/inscripciones/lista-inscripciones']));
    }
  }

  volver() {
    this.router.navigate(['/inscripciones/lista-inscripciones']);
  }
}
