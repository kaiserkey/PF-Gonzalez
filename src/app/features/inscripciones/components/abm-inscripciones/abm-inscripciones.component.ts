import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InscripcionesService,
  Inscripcion,
} from '../../../../core/services/inscripciones.service';
import { AuthService } from '../../../../core/services/auth.service';
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
  alumnos: { id: number; nombre: string }[] = [];
  cursos: { id: number; nombre: string }[] = [];
  idUsuario = 0;

  constructor(
    private fb: FormBuilder,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private authService: AuthService,
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
    this.idUsuario = this.authService.obtenerUsuarioLocal().id;
    this.cargarDatos();
  }

  cargarDatos() {
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => (this.cursos = cursos),
      error: (error) => console.error('Error al obtener cursos:', error),
    });

    this.alumnosService.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
        const id = this.route.snapshot.paramMap.get('id');
        if (id) this.cargarInscripcion(+id);
      },
      error: (error) => console.error('Error al obtener alumnos:', error),
    });
  }

  cargarInscripcion(id: number) {
    this.inscripcionId = id;
    this.inscripcionesService.obtenerInscripcionPorId(id).subscribe({
      next: (inscripcion) => {
        if (!inscripcion) return this.volver();
        this.inscripcionForm.patchValue(inscripcion);
      },
      error: () => this.volver(),
    });
  }

  guardarInscripcion() {
    if (this.inscripcionForm.invalid) return;

    const inscripcionData: Omit<Inscripcion, 'id'> = {
      ...this.inscripcionForm.value,
      idUsuario: this.idUsuario,
    };

    const request$ = this.inscripcionId
      ? this.inscripcionesService.actualizarInscripcion(this.inscripcionId, {
          id: this.inscripcionId,
          ...inscripcionData,
        })
      : this.inscripcionesService.agregarInscripcion(inscripcionData);

    request$.subscribe(() => this.volver());
  }

  volver() {
    this.router.navigate(['/inscripciones/lista-inscripciones']);
  }
}
