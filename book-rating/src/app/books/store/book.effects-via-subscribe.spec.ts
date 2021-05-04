import { HttpErrorResponse } from '@angular/common/http';
import { TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, Subject, throwError } from 'rxjs';
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
  let actions$: Subject<any>;
  let effects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions$),
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

    actions$ = new Subject<Action>();
    effects = TestBed.inject(BookEffects);
  });

  it('should load books', () => {

    let result: Action;
    effects.loadBooks$.subscribe(action => result = action);

    actions$.next(BookActions.loadBooks());

    // tick(500);

    expect(result.type).toBe(BookActions.loadBooksSuccess.type);
  });
});
