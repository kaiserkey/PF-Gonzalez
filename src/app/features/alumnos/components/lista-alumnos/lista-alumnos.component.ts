import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  AlumnosService,
  Alumno,
} from '../../../../core/services/alumnos.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
  standalone: false,
})
export class ListaAlumnosComponent implements OnInit {
  displayedColumns = ['nombre', 'perfil', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>([]);

  constructor(private alumnosService: AlumnosService) {}

  ngOnInit() {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
      this.dataSource.data = alumnos;
    });
  }

  eliminarAlumno(id: number) {
    this.alumnosService.eliminarAlumno(id).subscribe(() => {
      this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
        this.dataSource.data = alumnos;
      });
    });
  }
}
