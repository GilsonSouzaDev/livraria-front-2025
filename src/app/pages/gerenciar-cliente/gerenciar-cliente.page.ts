import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // Remova Validators
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartaoCreditoCliente } from '../../models/cartao-credito';
import { Cliente } from '../../models/cliente';
import { EnderecoDto } from '../../models/endereco';
import { TelefoneDto } from '../../models/telefone';
import { CartaoCreditoService } from '../../services/cartao-credito.service';
import { ClienteService } from '../../services/cliente.service';
import { EnderecoService } from '../../services/endereco.service';
import { TelefoneService } from '../../services/telefone.service';
import { CommonModule } from '@angular/common';
import { ClienteCartaoFormComponent } from '../../components/cliente-cartao-form/cliente-cartao-form.component';
import { ClienteEnderecoFormComponent } from '../../components/cliente-endereco-form/cliente-endereco-form.component';
import { ClienteTelefoneFormComponent } from '../../components/cliente-telefone-form/cliente-telefone-form.component';
import { ClienteFormComponent } from '../../components/cliente-form/cliente-form.component';

@Component({
  selector: 'app-gerenciar-cliente-page',
  standalone: true,
  imports: [
    CommonModule,
    ClienteCartaoFormComponent,
    ClienteEnderecoFormComponent,
    ClienteTelefoneFormComponent,
    ClienteFormComponent,
  ],
  templateUrl: './gerenciar-cliente.page.html',
  styleUrls: ['./gerenciar-cliente.page.scss'],
})
export class GerenciarClientePageComponent implements OnInit {
  private clienteId = Number(this.route.snapshot.paramMap.get('id'));

  telefones: TelefoneDto[] = [];
  enderecos: EnderecoDto[] = [];
  cartoes: CartaoCreditoCliente[] = [];

  clienteForm: FormGroup = this.fb.group({
    nome: [''],
    genero: [''],
    dataNascimento: [''],
    cpf: [''],
    email: [''],
  });

  cliente$: Observable<Cliente | undefined> | null = null;

  // Controla a visibilidade dos formulários
  exibirFormCliente: boolean = false;
  exibirFormTelefone: boolean = false;
  exibirFormEndereco: boolean = false;
  exibirFormCartao: boolean = false;

  // Variáveis para controlar qual item está sendo editado
  telefoneEmEdicao: TelefoneDto | null = null;
  enderecoEmEdicao: EnderecoDto | null = null;
  cartaoEmEdicao: CartaoCreditoCliente | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private telefoneService: TelefoneService,
    private enderecoService: EnderecoService,
    private cartaoCreditoService: CartaoCreditoService
  ) {}

  ngOnInit(): void {
    this.carregarCliente();
  }

  private carregarCliente(): void {
    this.cliente$ = this.clienteService.getClienteById(this.clienteId).pipe(
      tap((cliente) => {
        if (cliente) {
          this.clienteForm.patchValue({
            nome: cliente.nome,
            genero: cliente.genero,
            dataNascimento: cliente.dataNascimento,
            cpf: cliente.cpf,
            email: cliente.email,
          });

          this.telefones = cliente.telefonesClientes;
          this.enderecos = cliente.enderecosClientes;
          this.cartoes = cliente.cartoesCreditoClientes;
          console.log(cliente);
        }
      }),
      take(1) // Importante para evitar memory leaks
    );
  }

  onSubmit(): void {
    this.clienteService
      .updateCliente(this.clienteId, this.clienteForm.value) // Remova a verificação de validade
      .subscribe({
        next: () => {
          console.log('Cliente atualizado com sucesso!');
          this.router.navigate(['/clientes']);
        },
        error: (error) => console.error('Erro ao atualizar cliente:', error),
      });
  }

  deletarCliente(): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(this.clienteId).subscribe({
        next: () => {
          console.log('Cliente excluído com sucesso!');
          this.router.navigate(['/clientes']);
        },
        error: (error) => console.error('Erro ao excluir cliente:', error),
      });
    }
  }

  adicionarTelefone(telefone: TelefoneDto) {
    this.telefoneService
      .adicionarTelefone(telefone)
      .subscribe(() => this.carregarCliente());
  }

  removerTelefone(telefone: TelefoneDto): void {
    if (confirm('Tem certeza que deseja excluir este telefone?')) {
      this.telefoneService
        .excluirTelefone(telefone.telefoneId)
        .subscribe(() => this.carregarCliente());
    }
  }

  adicionarEndereco(endereco: EnderecoDto) {
    this.enderecoService
      .adicionarEndereco(endereco)
      .subscribe(() => this.carregarCliente());
  }

  adicionarCartao(cartao: CartaoCreditoCliente) {
    this.cartaoCreditoService
      .adicionarCartaoCredito(cartao)
      .subscribe(() => this.carregarCliente());
  }

  removerEndereco(id: number) {
    this.enderecoService
      .excluirEndereco(id)
      .subscribe(() => this.carregarCliente());
  }

  removerCartao(id: number) {
    this.cartaoCreditoService
      .excluirCartaoCredito(id)
      .subscribe(() => this.carregarCliente());
  }

  toggleFormCliente() {
    this.exibirFormCliente = !this.exibirFormCliente;
  }

  toggleFormTelefone() {
    this.exibirFormTelefone = !this.exibirFormTelefone;
    this.telefoneEmEdicao = null; // Limpa o telefone em edição ao abrir o formulário de adicionar
  }

  toggleFormEndereco() {
    this.exibirFormEndereco = !this.exibirFormEndereco;
    this.enderecoEmEdicao = null; // Limpa o endereço em edição ao abrir o formulário de adicionar
  }

  toggleFormCartao() {
    this.exibirFormCartao = !this.exibirFormCartao;
    this.cartaoEmEdicao = null; // Limpa o cartão em edição ao abrir o formulário de adicionar
  }

  // Métodos para editar telefones, endereços e cartões
  editarTelefone(telefone: TelefoneDto) {
    this.telefoneEmEdicao = { ...telefone }; // Cria uma cópia para evitar modificar o original diretamente
    this.exibirFormTelefone = true; // Abre o formulário de telefone
  }

  editarEndereco(endereco: EnderecoDto) {
    this.enderecoEmEdicao = { ...endereco }; // Cria uma cópia para evitar modificar o original diretamente
    this.exibirFormEndereco = true; // Abre o formulário de endereço
  }

  editarCartao(cartao: CartaoCreditoCliente) {
    this.cartaoEmEdicao = { ...cartao }; // Cria uma cópia para evitar modificar o original diretamente
    this.exibirFormCartao = true; // Abre o formulário de cartão
  }

  meuFormularioCliente() {}

  salvarCliente(form: FormGroup) {
    // Recebe o FormGroup como argumento
    console.log('Formulário do Cliente:', form.value);
    // Lógica para salvar o cliente
  }

  ativarInativarCliente(cliente: Cliente): void {
    const clienteAtualizado: Cliente = { ...cliente, ativo: !cliente.ativo };

    this.clienteService
      .updateCliente(this.clienteId, clienteAtualizado)
      .subscribe({
        next: () => {
          console.log('Status do cliente atualizado com sucesso!');
          this.carregarCliente(); // Recarrega o cliente para atualizar a tela
        },
        error: (error) =>
          console.error('Erro ao atualizar status do cliente:', error),
      });
  }

  // Métodos para salvar as edições (a serem implementados nos componentes de formulário)
  salvarTelefoneEditado(telefone: TelefoneDto) {
    this.telefoneService
      .atualizarTelefone(telefone.telefoneId, telefone)
      .subscribe({
        next: () => {
          console.log('Telefone atualizado com sucesso!');
          this.carregarCliente(); // Recarrega os dados
          this.exibirFormTelefone = false; // Fecha o formulário
          this.telefoneEmEdicao = null; // Limpa a variável de edição
        },
        error: (error) => console.error('Erro ao atualizar telefone:', error),
      });
  }

  salvarEnderecoEditado(endereco: EnderecoDto) {
    this.enderecoService.atualizarEndereco(endereco.enderecoId, endereco).subscribe({
      next: () => {
        console.log('Endereço atualizado com sucesso!');
        this.carregarCliente(); // Recarrega os dados
        this.exibirFormEndereco = false; // Fecha o formulário
        this.enderecoEmEdicao = null; // Limpa a variável de edição
      },
      error: (error) => console.error('Erro ao atualizar endereço:', error),
    });
  }

  salvarCartaoEditado(cartao: CartaoCreditoCliente) {
    this.cartaoCreditoService
      .atualizarCartaoCredito(cartao.cartaoCreditoClienteId, cartao)
      .subscribe({
        next: () => {
          console.log('Cartão atualizado com sucesso!');
          this.carregarCliente(); // Recarrega os dados
          this.exibirFormCartao = false; // Fecha o formulário
          this.cartaoEmEdicao = null; // Limpa a variável de edição
        },
        error: (error) => console.error('Erro ao atualizar cartão:', error),
      });
  }


}
