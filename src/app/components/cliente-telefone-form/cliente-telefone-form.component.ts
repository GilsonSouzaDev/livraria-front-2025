import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'; // Importe ReactiveFormsModule
import { TelefoneDto } from '../../models/telefone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-telefone-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Adicione ReactiveFormsModule aos imports
  templateUrl: './cliente-telefone-form.component.html',
  styleUrls: ['./cliente-telefone-form.component.scss'],
})
export class ClienteTelefoneFormComponent implements OnInit {
  @Input() clienteId!: number;
  @Input() telefoneEmEdicao: TelefoneDto | null = null; // Recebe o telefone para edição
  @Output() telefoneAdicionado = new EventEmitter<TelefoneDto>();
  @Output() telefoneEditado = new EventEmitter<TelefoneDto>(); // Evento para salvar a edição

  telefoneForm: FormGroup = this.fb.group({
    telefoneId: [null],
    tipoTelefone: [''],
    ddd: [''],
    numero: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.telefoneEmEdicao) {
      this.telefoneForm.patchValue({
        telefoneId: this.telefoneEmEdicao.telefoneId,
        tipoTelefone: this.telefoneEmEdicao.tipoTelefone,
        ddd: this.telefoneEmEdicao.ddd,
        numero: this.telefoneEmEdicao.numero,
      });
    }
  }

  onSubmit(): void {
    console.log(this.telefoneForm)
    if (this.telefoneEmEdicao) {
      const telefoneEditado: TelefoneDto = {
        telefoneId: this.telefoneEmEdicao.telefoneId,
        ...this.telefoneForm.value,
      };
      this.telefoneEditado.emit(telefoneEditado); // Emite o telefone editado
    } else {
      // Adicionar um novo telefone
      if (this.telefoneForm.valid) {
        const novoTelefone: TelefoneDto = {
          clienteId: this.clienteId,
          ...this.telefoneForm.value,
        };
        this.telefoneAdicionado.emit(novoTelefone);
        this.telefoneForm.reset(); // Limpa o formulário após adicionar
      }
    }
  }
}
