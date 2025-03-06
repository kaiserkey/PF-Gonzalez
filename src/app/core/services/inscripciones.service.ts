import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Inscripcion {
  id: number;
  idUsuario: number;
  idAlumno: number;
  idCurso: number;
  fecha: string;
  nombre?: string; // Nombre del alumno
  curso?: string; // Nombre del curso
  fechaInscripcion?: string; // Fecha formateada
}

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private apiUrl = 'http://localhost:3000/inscripciones';
  private alumnosUrl = 'http://localhost:3000/alumnos';
  private cursosUrl = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return forkJoin({
      inscripciones: this.http.get<Inscripcion[]>(this.apiUrl),
      alumnos: this.http.get<any[]>(this.alumnosUrl),
      cursos: this.http.get<any[]>(this.cursosUrl),
    }).pipe(
      map(({ inscripciones, alumnos, cursos }) => {
        return inscripciones.map((inscripcion) => {
          const alumno = alumnos.find((a) => a.id === inscripcion.idAlumno);
          const curso = cursos.find((c) => c.id === inscripcion.idCurso);

          return {
            ...inscripcion,
            nombre: alumno ? alumno.nombre : 'Desconocido',
            curso: curso ? curso.nombre : 'Desconocido',
            fechaInscripcion: inscripcion.fecha,
          };
        });
      }),
      catchError((error) => {
        console.error('Error al obtener inscripciones:', error);
        return throwError(
          () => new Error('No se pudieron cargar las inscripciones')
        );
      })
    );
  }

  obtenerInscripcionPorId(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener inscripción:', error);
        return throwError(() => new Error('No se pudo cargar la inscripción'));
      })
    );
  }

  agregarInscripcion(
    inscripcion: Omit<Inscripcion, 'id'>
  ): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion).pipe(
      catchError((error) => {
        console.error('Error al agregar inscripción:', error);
        return throwError(() => new Error('No se pudo agregar la inscripción'));
      })
    );
  }

  actualizarInscripcion(
    id: number,
    inscripcion: Inscripcion
  ): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(`${this.apiUrl}/${id}`, inscripcion).pipe(
      catchError((error) => {
        console.error('Error al actualizar inscripción:', error);
        return throwError(
          () => new Error('No se pudo actualizar la inscripción')
        );
      })
    );
  }

  eliminarInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar inscripción:', error);
        return throwError(
          () => new Error('No se pudo eliminar la inscripción')
        );
      })
    );
  }
}
