import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(value: boolean): string {
    return value
      ? 'Ativo'
      : 'Inativo';
  }
}
