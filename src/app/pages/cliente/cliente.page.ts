import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ClienteItemComponent } from '../../components/cliente-item/cliente-item.component';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ClienteItemComponent],
  templateUrl: './cliente.page.html',
  styleUrl: './cliente.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientePage implements OnInit {
  private clienteService = inject(ClienteService);
  clientes = this.clienteService.getClientes();

  clientes$: Observable<Cliente[]> = this.clienteService.getClientes();


  ngOnInit(): void {}
}
