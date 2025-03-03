import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alumno {
  id: number;
  nombre: string;
  perfil: string;
  sexo: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private apiUrl = 'http://localhost:3000/alumnos';

  constructor(private http: HttpClient) {}

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  agregarAlumno(alumno: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  actualizarAlumno(id: number, alumno: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno);
  }

  eliminarAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
