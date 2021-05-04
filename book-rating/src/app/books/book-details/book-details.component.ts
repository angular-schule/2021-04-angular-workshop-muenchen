import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookFacadeService } from '../store/book-facade.service';

import { selectBooksLoading, selectSelectedBook } from '../store/book.selectors';


@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  constructor(public facade: BookFacadeService) { }
}
