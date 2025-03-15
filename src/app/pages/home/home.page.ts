import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteCartaoFormComponent } from '../../components/cliente-cartao-form/cliente-cartao-form.component';
import { ClienteEnderecoFormComponent } from '../../components/cliente-endereco-form/cliente-endereco-form.component';
import { ClienteTelefoneFormComponent } from '../../components/cliente-telefone-form/cliente-telefone-form.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BookCardComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  books: Book[] = [];

  ngOnInit(): void {
    this.books = [
      {
        title: 'Livro 1',
        author: 'Autor 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        title: 'Livro 2',
        author: 'Autor 2',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        title: 'Livro 3',
        author: 'Autor 3',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ];
  }
}
