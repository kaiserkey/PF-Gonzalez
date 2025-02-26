import { Component, OnInit } from '@angular/core';
import { ClasesService, Clase } from '../../../../core/services/clases.service';

@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.css'],
  standalone: false,
})
export class ListaClasesComponent implements OnInit {
  displayedColumns = ['nombre', 'descripcion', 'horario', 'acciones'];
  clases: Array<Clase> = [];

  constructor(private clasesService: ClasesService) {}

  ngOnInit() {
    this.clasesService.clases$.subscribe((clases) => {
      this.clases = clases;
    });
  }

  eliminarClase(id: number) {
    this.clasesService.eliminarClase(id);
  }
}
