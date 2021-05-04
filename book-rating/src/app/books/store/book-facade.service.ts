import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadBooks } from './book.actions';
import { selectBooks, selectBooksLoading, selectSelectedBook } from './book.selectors';

@Injectable({
  providedIn: 'root'
})
export class BookFacadeService {

  loading$ = this.store.pipe(select(selectBooksLoading));
  books$ = this.store.pipe(select(selectBooks));
  book$ = this.store.select(selectSelectedBook);


  constructor(private store: Store) { }

  loadBooks() {
    this.store.dispatch(loadBooks());
  }

  // rateUp(book: Book) {
  //   this.store.dispatch(rateUp({ book }));
  // }

  // rateDown(book: Book) {
  //   this.store.dispatch(rateDown({ book }));
  // }
}
