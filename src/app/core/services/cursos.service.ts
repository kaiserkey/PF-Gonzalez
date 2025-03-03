import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curso {
  id: string;
  nombre: string;
  horas: number;
  clases: number;
  profesor: string;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiUrl = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  obtenerCursoPorId(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  agregarCurso(curso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  actualizarCurso(id: string, datos: Omit<Curso, 'id'>): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, datos);
  }

  eliminarCurso(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
