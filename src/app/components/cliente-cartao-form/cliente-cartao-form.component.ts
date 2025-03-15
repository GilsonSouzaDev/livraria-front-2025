import { CartaoCreditoCliente } from './../../models/cartao-credito';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-cartao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-cartao-form.component.html',
  styleUrls: ['./cliente-cartao-form.component.scss'],
})
export class ClienteCartaoFormComponent implements OnInit {
  @Input() clienteId!: number;
  @Input() cartaoEmEdicao: CartaoCreditoCliente | null = null;
  @Output() cartaoAdicionado = new EventEmitter<CartaoCreditoCliente>();
  @Output() cartaoEditado = new EventEmitter<CartaoCreditoCliente>();

  cartaoForm: FormGroup = this.fb.group({
    id:[null],
    bandeiraID: [''],
    numeroCartao: [''],
    nomeNoCartao: [''],
    codigoSeguranca: [''],
    preferencial: [false],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(
      'ID recebido para edição:',
      this.cartaoEmEdicao?.cartaoCreditoClienteId
    );
    if (this.cartaoEmEdicao) {
      this.cartaoForm.patchValue({
        cartaoCreditoClienteId: this.cartaoEmEdicao.cartaoCreditoClienteId,
        bandeiraID: this.cartaoEmEdicao.bandeiraID,
        numeroCartao: this.cartaoEmEdicao.numeroCartao,
        nomeNoCartao: this.cartaoEmEdicao.nomeNoCartao,
        codigoSeguranca: this.cartaoEmEdicao.codigoSeguranca,
        preferencial: this.cartaoEmEdicao.preferencial,
      });
    }
  }

  onSubmit(): void {
    if (this.cartaoEmEdicao) {
      console.log(this.cartaoEmEdicao.cartaoCreditoClienteId)
      const cartaoEditado: CartaoCreditoCliente = {
        cartaoCreditoClienteId: this.cartaoEmEdicao.cartaoCreditoClienteId,
        clienteId: this.clienteId,
        ...this.cartaoForm.value,
      };
      this.cartaoEditado.emit(cartaoEditado);
    } else {
      if (this.cartaoForm.valid) {
        const novoCartao: CartaoCreditoCliente = {
          clienteId: this.clienteId,
          ...this.cartaoForm.value,
        };
        this.cartaoAdicionado.emit(novoCartao);
        this.cartaoForm.reset();
      }
    }
  }
}
