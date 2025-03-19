import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { EnderecoDto } from '../../models/endereco';
import { CommonModule } from '@angular/common';
import { ESTADOS } from '../../models/estado';
import { TIPOS_LOGRADOURO } from '../../models/tipoLogradouro';

@Component({
  selector: 'app-cliente-endereco-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-endereco-form.component.html',
  styleUrls: ['./cliente-endereco-form.component.scss'],
})
export class ClienteEnderecoFormComponent implements OnInit {
  estados = ESTADOS; // Atribui o array ESTADOS a uma propriedade do componente
  tiposLogradouro = TIPOS_LOGRADOURO;

  @Input() clienteId!: number;
  @Input() enderecoEmEdicao: EnderecoDto | null = null;
  @Output() enderecoAdicionado = new EventEmitter<EnderecoDto>();
  @Output() enderecoEditado = new EventEmitter<EnderecoDto>();

  enderecoForm: FormGroup = this.fb.group({
    enderecoId: [null],
    nomeEndereco: [''],
    tipoResidencia: [''],
    tipoLogradouro: [''],
    logradouro: [''],
    numero: [''],
    bairro: [''],
    cep: [''],
    cidade: [''],
    estado: [''],
    pais: [''],
    observacoes: [''],
    usoCobranca: [false],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.enderecoEmEdicao) {
      this.enderecoForm.patchValue({
        enderecoId: this.enderecoEmEdicao.enderecoId,
        nomeEndereco: this.enderecoEmEdicao.nomeEndereco,
        tipoResidencia: this.enderecoEmEdicao.tipoResidencia,
        tipoLogradouro: this.enderecoEmEdicao.tipoLogradouro,
        logradouro: this.enderecoEmEdicao.logradouro,
        numero: this.enderecoEmEdicao.numero,
        bairro: this.enderecoEmEdicao.bairro,
        cep: this.enderecoEmEdicao.cep,
        cidade: this.enderecoEmEdicao.cidade,
        estado: this.enderecoEmEdicao.estado,
        pais: this.enderecoEmEdicao.pais,
        observacoes: this.enderecoEmEdicao.observacoes,
        usoCobranca: this.enderecoEmEdicao.usoCobranca,
      });
    }
  }

  onSubmit(): void {
    console.log(this.enderecoForm);
    if (this.enderecoEmEdicao) {
      const enderecoEditado: EnderecoDto = {
        enderecoId: this.enderecoEmEdicao.enderecoId,
        ...this.enderecoForm.value,
      };
      this.enderecoEditado.emit(enderecoEditado);
    } else {
      if (this.enderecoForm.valid) {
        const novoEndereco: EnderecoDto = {
          clienteId: this.clienteId,
          ...this.enderecoForm.value,
        };
        this.enderecoAdicionado.emit(novoEndereco);
        this.enderecoForm.reset();
      }
    }
  }
}
