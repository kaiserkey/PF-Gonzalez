import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  UsuariosService,
  Usuario,
} from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
  standalone: false,
})
export class ListaUsuariosComponent implements OnInit {
  displayedColumns = ['nombre', 'email', 'direccion', 'telefono', 'role'];
  dataSource = new MatTableDataSource<Usuario>([]);

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (usuarios) => (this.dataSource.data = usuarios),
      error: (error) => console.error('Error al cargar usuarios:', error),
    });
  }
}
