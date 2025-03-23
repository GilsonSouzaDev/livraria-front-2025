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
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ESTADOS } from '../../models/estado';
import { TIPOS_LOGRADOURO } from '../../models/tipoLogradouro';

@Component({
  selector: 'app-cadastro-cliente-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroClientePageComponent implements OnInit {
  estados = ESTADOS;
  tiposLogradouro = TIPOS_LOGRADOURO;

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  cadastroForm: FormGroup;

  constructor() {
    this.cadastroForm = this.fb.group({
      nome: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{3,100}$/)],
      ],
      codigoCliente: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9]{5,20}$/)],
      ],
      genero: ['', Validators.required],
      dataNascimento: [
        '',
        [Validators.required],
      ],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
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
      tipoTelefone: ['', Validators.required],
      ddd: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      numero: ['', [Validators.required, Validators.pattern(/^\d{8,9}$/)]],
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
      nomeEndereco: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{3,100}$/)],
      ],
      tipoResidencia: ['', Validators.required],
      tipoLogradouro: ['', Validators.required],
      logradouro: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ0-9\s]{3,150}$/)],
      ],
      numero: [
        '',
        [Validators.required, Validators.pattern(/^(\d{1,10}|S\/N)$/)],
      ],
      bairro: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{3,100}$/)],
      ],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cidade: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{3,100}$/)],
      ],
      estado: ['', Validators.required],
      pais: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]{3,100}$/)],
      ],
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
    if (this.cadastroForm.valid) {
      const cliente = this.cadastroForm.value as Cliente;
      this.clienteService.createCliente(cliente).subscribe({
        next: () => {
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
    } else {
      alert('Por favor, preencha os campos corretamente.');
      this.cadastroForm.markAllAsTouched();
    }
  }
}
