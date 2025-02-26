import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlumnosService,
  Alumno,
} from '../../../../core/services/alumnos.service';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css'],
  standalone: false,
})
export class AbmAlumnosComponent implements OnInit, OnDestroy {
  alumnoForm: FormGroup;
  alumnoId: number | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.alumnoId = +id;
            return this.alumnosService.obtenerAlumnoPorId(this.alumnoId);
          }
          return [];
        })
      )
      .subscribe((alumno) => {
        if (alumno) {
          this.alumnoForm.patchValue(alumno);
        }
      });
  }

  guardarAlumno() {
    if (this.alumnoForm.valid) {
      if (this.alumnoId) {
        this.alumnosService
          .actualizarAlumno(this.alumnoId, this.alumnoForm.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.router.navigate(['/alumnos/lista-alumnos']));
      } else {
        this.alumnosService
          .agregarAlumno(this.alumnoForm.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.router.navigate(['/alumnos/lista-alumnos']));
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
