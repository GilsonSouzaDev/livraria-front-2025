import { inject, Injectable, signal } from '@angular/core';
import { CartaoCreditoCliente } from '../models/cartao-credito';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartaoCreditoService {
  chamadaHttp = inject(HttpClient);

  private apiURL = 'http://localhost:8080/api/CartaoCreditoCliente';

  adicionarCartaoCredito(cartaoCredito: CartaoCreditoCliente): Observable<CartaoCreditoCliente> {
    return this.chamadaHttp.post<CartaoCreditoCliente>(
      `${this.apiURL}/inserir-cartoes`, cartaoCredito
    );
  }

  excluirCartaoCredito(id: number): Observable<void> {
    return this.chamadaHttp.delete<void>(`${this.apiURL}/${id}`);
  }

  atualizarCartaoCredito(id: number, cartao: CartaoCreditoCliente): Observable<CartaoCreditoCliente>{
    return this.chamadaHttp.put<CartaoCreditoCliente>(`${this.apiURL}/${id}`,cartao);
  }
}
