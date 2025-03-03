import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlumnosService,
  Alumno,
} from '../../../../core/services/alumnos.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css'],
  standalone: false,
})
export class AbmAlumnosComponent implements OnInit {
  alumnoForm: FormGroup;
  alumnoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      perfil: ['', Validators.required],
      sexo: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alumnoId = +id;
      this.alumnosService
        .obtenerAlumnoPorId(this.alumnoId)
        .pipe(take(1))
        .subscribe((alumno) => {
          if (alumno) {
            this.alumnoForm.patchValue(alumno);
          }
        });
    }
  }

  guardarAlumno() {
    if (this.alumnoForm.valid) {
      if (this.alumnoId) {
        this.alumnosService
          .actualizarAlumno(this.alumnoId, this.alumnoForm.value)
          .pipe(take(1))
          .subscribe(() => this.router.navigate(['/alumnos/lista-alumnos']));
      } else {
        this.alumnosService
          .agregarAlumno(this.alumnoForm.value)
          .pipe(take(1))
          .subscribe(() => this.router.navigate(['/alumnos/lista-alumnos']));
      }
    }
  }
}
