import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasesService, Clase } from '../../../../core/services/clases.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-abm-clases',
  templateUrl: './abm-clases.component.html',
  styleUrls: ['./abm-clases.component.css'],
  standalone: false,
})
export class AbmClasesComponent implements OnInit, OnDestroy {
  claseForm: FormGroup;
  claseId: number | null = null;
  private subscription: Subscription = new Subscription();

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
    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.claseId = +id;
          this.cargarClase(this.claseId);
        }
      })
    );
  }

  cargarClase(id: number) {
    this.subscription.add(
      this.clasesService.obtenerClasePorId(id).subscribe(
        (clase) => {
          if (clase) {
            this.claseForm.patchValue(clase);
          }
        },
        (error) => {
          console.error('Error al cargar la clase', error);
        }
      )
    );
  }

  guardarClase() {
    if (this.claseForm.valid) {
      if (this.claseId !== null) {
        this.clasesService
          .actualizarClase(this.claseId, this.claseForm.value)
          .subscribe(() => {
            this.router.navigate(['/clases/lista-clases']);
          });
      } else {
        this.clasesService.agregarClase(this.claseForm.value).subscribe(() => {
          this.router.navigate(['/clases/lista-clases']);
        });
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
