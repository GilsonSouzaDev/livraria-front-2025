import { inject, Injectable, signal } from '@angular/core';
import {
  TelefoneDto,
} from '../models/telefone';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TelefoneService {

    chamadaHttp = inject(HttpClient);

    private apiURL = 'http://localhost:8080/api/TelefoneCliente';


  adicionarTelefone(telefone: TelefoneDto): Observable<TelefoneDto> {
    return this.chamadaHttp.post<TelefoneDto>(`${this.apiURL}/inserir-telefones`, telefone)
  }

  atualizarTelefone(Id: number, telefone: TelefoneDto): Observable<TelefoneDto> {
    return this.chamadaHttp.put<TelefoneDto>(`${this.apiURL}/${Id}`, telefone)
  }

  excluirTelefone(Id: number): Observable<void> {
    return this.chamadaHttp.delete<void>(`${this.apiURL}/${Id}`)
  }
}
