import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AlumnosService, Alumno } from '../core/services/alumnos.service';

describe('AlumnosService', () => {
  let service: AlumnosService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/alumnos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlumnosService],
    });
    service = TestBed.inject(AlumnosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener la lista de alumnos', () => {
    const mockAlumnos: Alumno[] = [
      { id: 1, nombre: 'Juan', perfil: 'Desarrollador', sexo: 'M' },
      { id: 2, nombre: 'Ana', perfil: 'IT', sexo: 'F' },
    ];

    service.obtenerAlumnos().subscribe((alumnos) => {
      expect(alumnos.length).toBe(2);
      expect(alumnos).toEqual(mockAlumnos);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockAlumnos);
  });

  it('debe obtener un alumno por ID', () => {
    const mockAlumno: Alumno = {
      id: 1,
      nombre: 'Juan',
      perfil: 'Desarrollador',
      sexo: 'M',
    };

    service.obtenerAlumnoPorId(1).subscribe((alumno) => {
      expect(alumno).toEqual(mockAlumno);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAlumno);
  });
});
