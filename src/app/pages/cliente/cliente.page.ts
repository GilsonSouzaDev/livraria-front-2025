import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ClienteItemComponent } from '../../components/cliente-item/cliente-item.component';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from '../../models/cliente';
import { ClienteSearchComponent } from '../../components/cliente-search/cliente-search.component';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ClienteItemComponent, ClienteSearchComponent],
  templateUrl: './cliente.page.html',
  styleUrl: './cliente.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientePage {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  exibirMensagemInicial: boolean = true;

  constructor(private clienteService: ClienteService) {}

  private clientes$ = new BehaviorSubject<Cliente[]>([]);

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService
      .getClientes()
      .pipe(
        tap((clientes) => {
          console.log('Clientes recebidos do serviço:', clientes);
          this.clientes$.next(clientes);
        })
      )
      .subscribe();
  }

  onSearch(searchTerms: string[]): void {
    this.exibirMensagemInicial = false;
    if (searchTerms.length === 0) {
      this.clientesFiltrados = [];
      return;
    }

    // Aplica o filtro sempre que a lista de clientes é atualizada
    this.clientes$.subscribe((clientes) => {
      this.clientesFiltrados = clientes.filter((cliente) => {
        return searchTerms.every((term) => {
          const termLower = term.toLowerCase();
          return (
            cliente.nome.toLowerCase().includes(termLower) ||
            cliente.email.toLowerCase().includes(termLower) ||
            cliente.cpf.toLowerCase().includes(termLower) ||
            cliente.codigoCliente.toLowerCase().includes(termLower)
          );
        });
      });
    });
  }
}
