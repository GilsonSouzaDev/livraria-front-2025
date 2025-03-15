import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-item',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './cliente-item.component.html',
  styleUrl: './cliente-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClienteItemComponent {
  @Input() cliente!: Cliente;
}
