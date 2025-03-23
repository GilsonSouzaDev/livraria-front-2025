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
    nome: [
      '',
      [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{3,100}$/)],
    ],
    codigoCliente: [
      '',
      [Validators.required, Validators.pattern(/^[A-Za-z0-9]{5,20}$/)],
    ],
    genero: [
      '',
      [Validators.required, Validators.pattern(/^(Masculino|Feminino|Outro)$/)],
    ],
    dataNascimento: [
      '',
      [Validators.required],
    ],
    cpf: [
      '',
      [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    ativo: [],
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
        ativo: this.clienteEmEdicao.ativo,
      });
    }
  }

  onSubmit(): void {
    console.log(this.clienteForm.value)
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
