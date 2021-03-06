import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import * as BookActions from './book.actions';
import { BookEffects } from './book.effects';


const testBook: Book = {
  isbn: '000',
  title: 'test',
  description: 'test',
  rating: 5,
};

describe('BookEffects', () => {
  let actions$: Observable<any>;
  let effects: BookEffects;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions$),
        // see https://ngrx.io/api/store/testing/provideMockStore
        provideMockStore(),
        {
          provide: BookStoreService,
          useValue: {
            getAll: () => of([testBook])
          }
        }
      ],
      imports: [RouterTestingModule]
    });

    effects = TestBed.inject(BookEffects);
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load books', () => {
    testScheduler.run(({ cold, hot, expectObservable }) => {

      actions$ = hot('-a-|', {
        a: BookActions.loadBooks()
      });

      expectObservable(effects.loadBooks$).toBe('-a-|', {
        a: BookActions.loadBooksSuccess({ books: [testBook] })
      });
    });
  });

  it('should fail to load books on failing BookStoreService', () => {

    const bs = TestBed.inject(BookStoreService);
    const errorResponse = new HttpErrorResponse({});
    spyOn(bs, 'getAll').and.callFake(() => throwError(errorResponse));

    testScheduler.run(({ cold, hot, expectObservable }) => {

      actions$ = hot('-a-|', {
        a: BookActions.loadBooks()
      });

      expectObservable(effects.loadBooks$).toBe('-a-|', {
        a: BookActions.loadBooksFailure({ error: errorResponse })
      });
    });
  });
});
