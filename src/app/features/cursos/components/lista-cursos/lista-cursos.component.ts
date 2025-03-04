import { Component, OnInit } from '@angular/core';
import { CursosService, Curso } from '../../../../core/services/cursos.service';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
  standalone: false,
})
export class ListaCursosComponent implements OnInit {
  displayedColumns = ['nombre', 'horas', 'clases', 'profesor', 'acciones'];
  cursos: Curso[] = [];

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    this.cursosService.obtenerCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });
  }

  eliminarCurso(id: number) {
    this.cursosService.eliminarCurso(id).subscribe(() => {
      this.cursos = this.cursos.filter((curso) => curso.id !== id);
    });
  }
}
