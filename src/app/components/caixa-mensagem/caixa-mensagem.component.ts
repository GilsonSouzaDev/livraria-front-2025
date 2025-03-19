import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-caixa-mensagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caixa-mensagem.component.html',
  styleUrl: './caixa-mensagem.component.scss',
})
export class CaixaMensagemComponent {

  @Input() mensagem: string = '';
  @Input() tipo: 'sucesso' | 'erro' | 'info' = 'info'; // Tipo de mensagem

  get icone(): string {
    switch (this.tipo) {
      case 'sucesso':
        return 'fa-check-circle';
      case 'erro':
        return 'fa-times-circle';
      case 'info':
      default:
        return 'fa-info-circle';
    }
  }
}
