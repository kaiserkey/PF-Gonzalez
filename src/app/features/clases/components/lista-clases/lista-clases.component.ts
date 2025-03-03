import { Component, OnInit } from '@angular/core';
import { ClasesService, Clase } from '../../../../core/services/clases.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.css'],
  standalone: false,
})
export class ListaClasesComponent implements OnInit {
  displayedColumns = ['nombre', 'descripcion', 'horario', 'acciones'];
  clases: Clase[] = [];

  constructor(private clasesService: ClasesService) {
    console.log('ListaClasesComponent constructor');
  }

  ngOnInit() {
    this.obtenerClases();
  }

  obtenerClases() {
    this.clasesService
      .obtenerClases()
      .pipe(take(1))
      .subscribe((clases) => {
        this.clases = clases;
      });
  }

  eliminarClase(id: number) {
    this.clasesService
      .eliminarClase(id)
      .pipe(take(1))
      .subscribe(() => {
        this.obtenerClases();
      });
  }
}
