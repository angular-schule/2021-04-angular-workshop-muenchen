import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectBooksLoading, selectSelectedBook } from '../store/book.selectors';


@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book$ = this.store.select(selectSelectedBook);
  loading$ = this.store.select(selectBooksLoading);


  constructor(private store: Store) { }

}
