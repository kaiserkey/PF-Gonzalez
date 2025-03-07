import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  InscripcionesService,
  Inscripcion,
} from '../core/services/inscripciones.service';

describe('InscripcionesService', () => {
  let service: InscripcionesService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/inscripciones';
  const alumnosUrl = 'http://localhost:3000/alumnos';
  const cursosUrl = 'http://localhost:3000/cursos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InscripcionesService],
    });
    service = TestBed.inject(InscripcionesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener la lista de inscripciones con alumnos y cursos', () => {
    const mockInscripciones: Inscripcion[] = [
      { id: 1, idUsuario: 1, idAlumno: 1, idCurso: 1, fecha: '2025-03-06' },
    ];
    const mockAlumnos = [{ id: 1, nombre: 'Juan' }];
    const mockCursos = [{ id: 1, nombre: 'Matemáticas' }];

    service.obtenerInscripciones().subscribe((inscripciones) => {
      expect(inscripciones.length).toBe(1);
      expect(inscripciones[0].nombre).toBe('Juan');
      expect(inscripciones[0].curso).toBe('Matemáticas');
    });

    const reqInscripciones = httpMock.expectOne(apiUrl);
    expect(reqInscripciones.request.method).toBe('GET');
    reqInscripciones.flush(mockInscripciones);

    const reqAlumnos = httpMock.expectOne(alumnosUrl);
    expect(reqAlumnos.request.method).toBe('GET');
    reqAlumnos.flush(mockAlumnos);

    const reqCursos = httpMock.expectOne(cursosUrl);
    expect(reqCursos.request.method).toBe('GET');
    reqCursos.flush(mockCursos);
  });
});
