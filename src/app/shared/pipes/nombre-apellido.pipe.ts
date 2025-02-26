import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreApellido',
  standalone: false,
})
export class NombreApellidoPipe implements PipeTransform {
  transform(value: { nombre: string; apellido: string }): string {
    if (!value || !value.nombre || !value.apellido) return '';
    return `${value.apellido.toUpperCase()}, ${value.nombre}`;
  }
}
