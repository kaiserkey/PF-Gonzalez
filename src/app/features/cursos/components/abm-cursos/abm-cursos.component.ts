import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService, Curso } from '../../../../core/services/cursos.service';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.css'],
  standalone: false,
})
export class AbmCursosComponent implements OnInit, OnDestroy {
  cursoForm: FormGroup;
  cursoId: number | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.cursoId = +id;
            return this.cursosService.obtenerCursoPorId(this.cursoId);
          }
          return [];
        })
      )
      .subscribe((curso) => {
        if (curso) {
          this.cursoForm.patchValue(curso);
        }
      });
  }

  guardarCurso() {
    if (this.cursoForm.valid) {
      if (this.cursoId) {
        this.cursosService
          .actualizarCurso(this.cursoId, this.cursoForm.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.router.navigate(['/cursos/lista-cursos']));
      } else {
        this.cursosService
          .agregarCurso(this.cursoForm.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.router.navigate(['/cursos/lista-cursos']));
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
