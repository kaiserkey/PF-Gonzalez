import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasesService, Clase } from '../../../../core/services/clases.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-abm-clases',
  templateUrl: './abm-clases.component.html',
  styleUrls: ['./abm-clases.component.css'],
  standalone: false,
})
export class AbmClasesComponent implements OnInit {
  claseForm: FormGroup;
  claseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clasesService: ClasesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.claseForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      horario: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.claseId = +id;
      this.clasesService
        .obtenerClasePorId(this.claseId)
        .pipe(take(1))
        .subscribe((clase) => {
          if (clase) {
            this.claseForm.patchValue(clase);
          }
        });
    }
  }

  guardarClase() {
    if (this.claseForm.valid) {
      if (this.claseId) {
        this.clasesService
          .actualizarClase(this.claseId, this.claseForm.value)
          .pipe(take(1))
          .subscribe(() => this.router.navigate(['/clases/lista-clases']));
      } else {
        this.clasesService
          .agregarClase(this.claseForm.value)
          .pipe(take(1))
          .subscribe(() => this.router.navigate(['/clases/lista-clases']));
      }
    }
  }
}
