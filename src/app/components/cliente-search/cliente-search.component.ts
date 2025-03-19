import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-cliente-search',
  standalone: true,
  imports: [FormsModule, MatIconModule, RouterLink],
  templateUrl: './cliente-search.component.html',
  styleUrl: './cliente-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClienteSearchComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string[]>();

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      const searchTerms = this.searchTerm.trim().split(/\s+/);
      this.search.emit(searchTerms);
    }
  }

  onClear(): void {
    this.searchTerm = '';
    this.search.emit([]);
  }
}
