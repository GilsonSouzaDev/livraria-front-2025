import { CartaoCreditoCliente } from "./cartao-credito";
import { EnderecoDto } from "./endereco";
import { TelefoneDto } from "./telefone";


export interface Cliente {
  clienteId: number;
  codigoCliente: string;
  genero: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  ranking: number;
  ativo: boolean;
  telefonesClientes: TelefoneDto[];
  enderecosClientes: EnderecoDto[];
  cartoesCreditoClientes: CartaoCreditoCliente[];
}

