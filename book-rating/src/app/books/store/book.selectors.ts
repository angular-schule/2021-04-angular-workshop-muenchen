import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from '../shared/book';
import * as fromBook from './book.reducer';

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

export const selectBooksLoading = createSelector(
  selectBookState,
  state => state.loading
);

export const selectBooks = createSelector(
  selectBookState,
  state => state.books
);


// weitere Beispiele (nicht genutzt)

export const selectFirstBookTitle = createSelector(
  selectBooks,
  state => state.length ? state[0].title : 'no title'
);

export const selectBookByIsbn = createSelector(
  selectBooks,
  (state: Book[], props) => state.find(x => x.isbn === props)
);
