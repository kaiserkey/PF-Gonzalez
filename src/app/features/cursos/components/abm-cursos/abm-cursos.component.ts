import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../../core/services/cursos.service';
import { AuthService } from '../../../../core/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.css'],
  standalone: false,
})
export class AbmCursosComponent implements OnInit {
  cursoForm: FormGroup;
  cursoId: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      horas: ['', [Validators.required, Validators.min(1)]],
      clases: ['', [Validators.required, Validators.min(1)]],
      profesor: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.userPerfil === 'admin';
    if (!this.isAdmin) {
      this.router.navigate(['/cursos/lista-cursos']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoId = +id;
      this.cursosService
        .obtenerCursoPorId(this.cursoId)
        .pipe(take(1))
        .subscribe((curso) => {
          if (curso) {
            this.cursoForm.patchValue(curso);
          }
        });
    }
  }

  guardarCurso() {
    if (this.cursoForm.valid && this.isAdmin) {
      const request$ = this.cursoId
        ? this.cursosService.actualizarCurso(this.cursoId, this.cursoForm.value)
        : this.cursosService.agregarCurso(this.cursoForm.value);

      request$
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['/cursos/lista-cursos']));
    }
  }
}
