import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {

  @Input() book!: Book;



}

