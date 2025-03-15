export interface EnderecoDto {
  enderecoId: number;
  clienteID: number;
  nomeEndereco: string;
  tipoResidencia: string;
  tipoLogradouro: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
  observacoes: string;
  usoCobranca: boolean;
}

