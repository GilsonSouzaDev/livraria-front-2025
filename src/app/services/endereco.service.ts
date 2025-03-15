import { inject, Injectable, signal } from '@angular/core';
import { EnderecoDto } from '../models/endereco';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {

  chamadaHttp = inject(HttpClient);

  private apiURL = 'http://localhost:8080/api/EnderecoCliente';

  adicionarEndereco(endereco: EnderecoDto): Observable<EnderecoDto> {
    return this.chamadaHttp.post<EnderecoDto>(`${this.apiURL}/inserir-enderecos`, endereco)
  }

  atualizarEndereco(Id: number, endereco: EnderecoDto): Observable<EnderecoDto> {
    return this.chamadaHttp.put<EnderecoDto>(`${this.apiURL}/${Id}`, endereco)
  }

  excluirEndereco(Id: number): Observable<void> {
    return this.chamadaHttp.delete<void>(`${this.apiURL}/${Id}`)
  }

}
