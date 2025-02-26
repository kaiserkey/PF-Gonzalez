import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: false,
})
export class ToolbarComponent implements OnInit {
  title: string = 'Gestión de Alumnos';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.updateTitle();
    });

    this.updateTitle();
  }

  updateTitle(): void {
    const currentRoute = this.router.url;

    if (currentRoute.includes('/alumnos')) {
      this.title = 'Gestión de Alumnos';
    } else if (currentRoute.includes('/clases')) {
      this.title = 'Gestión de Clases';
    } else if (currentRoute.includes('/cursos')) {
      this.title = 'Gestión de Cursos';
    }
  }
}
