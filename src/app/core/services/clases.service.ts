import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private clasesSource = new BehaviorSubject<Clase[]>([
    {
      id: 1,
      nombre: 'Angular Material',
      descripcion: 'Clase de Angular Material',
      horario: 'Lunes 10:00 AM',
    },
    {
      id: 2,
      nombre: 'JavaScript Avanzado',
      descripcion: 'Clase de JavaScript Avanzado',
      horario: 'Miércoles 2:00 PM',
    },
  ]);
  clases$ = this.clasesSource.asObservable();

  private currentId = this.clasesSource.value.length + 1;

  obtenerClases(): Observable<Clase[]> {
    return this.clases$;
  }

  obtenerClasePorId(id: number): Observable<Clase> {
    return new Observable((observer) => {
      const clase = this.clasesSource.value.find((c) => c.id === id);
      if (clase) {
        observer.next(clase);
      } else {
        observer.error('Clase no encontrada');
      }
      observer.complete();
    });
  }

  agregarClase(clase: Omit<Clase, 'id'>): Observable<Clase[]> {
    const nuevaClase: Clase = { ...clase, id: this.currentId++ };
    const nuevasClases = [...this.clasesSource.value, nuevaClase];
    this.clasesSource.next(nuevasClases);
    return this.clases$;
  }

  actualizarClase(id: number, datos: Omit<Clase, 'id'>): Observable<Clase[]> {
    const clasesActualizadas = this.clasesSource.value.map((clase) =>
      clase.id === id ? { ...clase, ...datos } : clase
    );
    this.clasesSource.next(clasesActualizadas);
    return this.clases$;
  }

  eliminarClase(id: number): Observable<Clase[]> {
    const clasesActualizadas = this.clasesSource.value.filter(
      (clase) => clase.id !== id
    );
    this.clasesSource.next(clasesActualizadas);
    return this.clases$;
  }
}
