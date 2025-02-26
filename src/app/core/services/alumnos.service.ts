import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnosSource = new BehaviorSubject<Alumno[]>([
    { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 22 },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', edad: 25 },
    { id: 3, nombre: 'Carlos', apellido: 'Lopez', edad: 23 },
  ]);
  alumnos$ = this.alumnosSource.asObservable();

  private currentId = this.alumnosSource.value.length + 1;

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.alumnos$;
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return new Observable((observer) => {
      const alumno = this.alumnosSource.value.find((a) => a.id === id);
      observer.next(alumno);
      observer.complete();
    });
  }

  agregarAlumno(alumno: Omit<Alumno, 'id'>): Observable<Alumno[]> {
    const nuevoAlumno: Alumno = { ...alumno, id: this.currentId++ };
    const nuevosAlumnos = [...this.alumnosSource.value, nuevoAlumno];
    this.alumnosSource.next(nuevosAlumnos);
    return this.alumnos$;
  }

  actualizarAlumno(
    id: number,
    datos: Omit<Alumno, 'id'>
  ): Observable<Alumno[]> {
    const alumnosActualizados = this.alumnosSource.value.map((alumno) =>
      alumno.id === id ? { ...alumno, ...datos } : alumno
    );
    this.alumnosSource.next(alumnosActualizados);
    return this.alumnos$;
  }

  eliminarAlumno(id: number): Observable<Alumno[]> {
    const alumnosActualizados = this.alumnosSource.value.filter(
      (alumno) => alumno.id !== id
    );
    this.alumnosSource.next(alumnosActualizados);
    return this.alumnos$;
  }
}
