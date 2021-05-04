import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadBooks } from './book.actions';
import { selectBookByIsbn, selectBooks, selectBooksLoading, selectSelectedBook } from './book.selectors';

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

  selectBookByIsbn(isbn: string) {
    // TODO: action feuern
    // this.store.dispatch(loadBooks());
    return this.store.select(selectBookByIsbn, { isbn });
  }

  // rateUp(book: Book) {
  //   this.store.dispatch(rateUp({ book }));
  // }

  // rateDown(book: Book) {
  //   this.store.dispatch(rateDown({ book }));
  // }
}
