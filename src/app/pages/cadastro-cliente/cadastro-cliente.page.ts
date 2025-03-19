import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroClientePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  cadastroForm: FormGroup;

  constructor() {
    this.cadastroForm = this.fb.group({
      nome: [''],
      codigoCliente: [''],
      genero: [''],
      dataNascimento: [''],
      cpf: [''],
      email: [''],
      ativo: [true],
      telefonesClientes: this.fb.array([]),
      enderecosClientes: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get telefones(): FormArray {
    return this.cadastroForm.get('telefonesClientes') as FormArray;
  }

  newTelefone(): FormGroup {
    return this.fb.group({
      clienteID: 0,
      tipoTelefone: [''],
      ddd: [''],
      numero: [''],
    });
  }

  addTelefone() {
    this.telefones.push(this.newTelefone());
  }

  removeTelefone(i: number) {
    this.telefones.removeAt(i);
  }

  get enderecos(): FormArray {
    return this.cadastroForm.get('enderecosClientes') as FormArray;
  }

  newEndereco(): FormGroup {
    return this.fb.group({
      clienteID: 0,
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
  }

  addEndereco() {
    this.enderecos.push(this.newEndereco());
  }

  removeEndereco(i: number) {
    this.enderecos.removeAt(i);
  }

  onSubmit() {
    const clienteteste = this.cadastroForm.value;
    console.log(clienteteste);
    const cliente = this.cadastroForm.value as Cliente; // Remove a verificação de validade
    this.clienteService.createCliente(cliente).subscribe({
      next: (novoCliente) => {
        alert('Cadastro realizado com sucesso!');
        this.cadastroForm.reset();
        this.telefones.clear();
        this.enderecos.clear();
        this.router.navigate(['/cliente']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar cliente', error);
        alert('Erro ao cadastrar cliente');
      },
    });
  }
}
