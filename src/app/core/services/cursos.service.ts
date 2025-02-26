import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: number;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursosSource = new BehaviorSubject<Curso[]>([
    {
      id: 1,
      nombre: 'JavaScript',
      descripcion: 'Curso sobre JavaScript',
      duracion: 40,
    },
    {
      id: 2,
      nombre: 'C# y .NET',
      descripcion: 'Curso sobre C# y .NET',
      duracion: 30,
    },
  ]);
  cursos$ = this.cursosSource.asObservable();

  private currentId = this.cursosSource.value.length + 1;

  obtenerCursos(): Observable<Curso[]> {
    return this.cursos$;
  }

  obtenerCursoPorId(id: number): Observable<Curso | undefined> {
    return new Observable((observer) => {
      const curso = this.cursosSource.value.find((c) => c.id === id);
      observer.next(curso);
      observer.complete();
    });
  }

  agregarCurso(curso: Omit<Curso, 'id'>): Observable<Curso[]> {
    const nuevoCurso: Curso = { ...curso, id: this.currentId++ };
    const nuevosCursos = [...this.cursosSource.value, nuevoCurso];
    this.cursosSource.next(nuevosCursos);
    return this.cursos$;
  }

  actualizarCurso(id: number, datos: Omit<Curso, 'id'>): Observable<Curso[]> {
    const cursosActualizados = this.cursosSource.value.map((curso) =>
      curso.id === id ? { ...curso, ...datos } : curso
    );
    this.cursosSource.next(cursosActualizados);
    return this.cursos$;
  }

  eliminarCurso(id: number): Observable<Curso[]> {
    const cursosActualizados = this.cursosSource.value.filter(
      (curso) => curso.id !== id
    );
    this.cursosSource.next(cursosActualizados);
    return this.cursos$;
  }
}
