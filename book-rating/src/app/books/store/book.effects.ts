import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { mapToParam, ofRoute } from 'src/app/utils-ngrx-router/operators';

import { BookStoreService } from '../shared/book-store.service';
import * as BookActions from './book.actions';
import { selectBooks } from './book.selectors';

@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.bs.getAll().pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });

  // loadElementOnRouting$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofRoute(['books/:isbn']),
  //     // ofRoute(/books\/.*/),
  //     mapToParam('isbn'),
  //     map(isbn => BookActions.detailsRouteLoaded({ isbn }))
  //   )
  // );

  loadElementOnRouting$ = createEffect(() =>
    this.actions$.pipe(
      ofRoute(['books/:isbn']),
      mapToParam('isbn'),
      withLatestFrom(
        this.store.select(selectBooks)
      ),
      concatMap(([isbn, books]) => [
        ...(!books.length ? [BookActions.loadBooks()] : [])
      ])
    )
  );

  constructor(private actions$: Actions,
              private bs: BookStoreService,
              private store: Store) {}
}
