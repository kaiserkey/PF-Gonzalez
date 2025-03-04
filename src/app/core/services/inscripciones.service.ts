import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Inscripcion {
  id: number;
  idUsuario: number;
  idAlumno: number;
  idCurso: number;
  fecha: string;
  nombre?: string; // nombre del alumno
  curso?: string; // nombre del curso
  fechaInscripcion?: string; //fecha formateada
}

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private apiUrl = 'http://localhost:3000/inscripciones';
  private alumnosUrl = 'http://localhost:3000/alumnos';
  private cursosUrl = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  obtenerInscripciones(): Observable<Inscripcion[]> {
    const currentUser = this.authService.obtenerUsuarioLocal();
    if (!currentUser || !currentUser.id) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return forkJoin({
      inscripciones: this.http.get<Inscripcion[]>(this.apiUrl),
      alumnos: this.http.get<any[]>(this.alumnosUrl),
      cursos: this.http.get<any[]>(this.cursosUrl),
    }).pipe(
      map(({ inscripciones, alumnos, cursos }) => {
        // Filtrar inscripciones del usuario actual
        const filtered = inscripciones.filter(
          (inscripcion) => inscripcion.idUsuario === currentUser.id
        );

        // Combinar datos de inscripciones, alumnos y cursos
        return filtered.map((inscripcion) => {
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
    const currentUser = this.authService.obtenerUsuarioLocal();
    if (!currentUser || !currentUser.id) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const nuevaInscripcion = { ...inscripcion, idUsuario: currentUser.id };
    return this.http.post<Inscripcion>(this.apiUrl, nuevaInscripcion).pipe(
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
