import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clase {
  id: number;
  nombre: string;
  descripcion: string;
  horario: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  private apiUrl = 'http://localhost:3000/clases';

  constructor(private http: HttpClient) {}

  obtenerClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl);
  }

  obtenerClasePorId(id: number): Observable<Clase> {
    return this.http.get<Clase>(`${this.apiUrl}/${id}`);
  }

  agregarClase(clase: Omit<Clase, 'id'>): Observable<Clase> {
    return this.http.post<Clase>(this.apiUrl, clase);
  }

  actualizarClase(id: number, datos: Omit<Clase, 'id'>): Observable<Clase> {
    return this.http.put<Clase>(`${this.apiUrl}/${id}`, datos);
  }

  eliminarClase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
