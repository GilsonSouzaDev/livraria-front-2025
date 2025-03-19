import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importe CommonModule
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Adicione CommonModule aos imports
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
})
export class ClienteFormComponent implements OnInit {
  @Input() clienteId!: number;
  @Input() clienteEmEdicao: Cliente | null = null;
  @Output() clienteEditado = new EventEmitter<Cliente>();

  clienteForm: FormGroup = this.fb.group({
    clienteId: [null],
    nome: [''],
    codigoCliente: [''],
    genero: [''],
    dataNascimento: [''],
    cpf: [''],
    email: [''],
    ativo: []
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.clienteEmEdicao) {
      this.clienteForm.patchValue({
        clienteId: this.clienteEmEdicao.clienteId,
        nome: this.clienteEmEdicao.nome,
        codigoCliente: this.clienteEmEdicao.codigoCliente,
        genero: this.clienteEmEdicao.genero,
        dataNascimento: this.clienteEmEdicao.dataNascimento,
        cpf: this.clienteEmEdicao.cpf,
        email: this.clienteEmEdicao.email,
        ativo: this.clienteEmEdicao.ativo
      });
    }
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const clienteEditado: Cliente = {
        clienteId: this.clienteEmEdicao?.clienteId,
        ...this.clienteForm.value,
      };
      this.clienteEditado.emit(clienteEditado);
    } else {
      console.error('O formulário não é válido.');
    }
  }
}
