import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {
          provide: BookStoreService,
          useValue: {
            search: term => of([{ title: 'Book ' + term }]),
          },
        },
      ],
      imports: [RouterTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deliver search results', fakeAsync(() => {
    let lastResult: Book[];
    component.results$.subscribe(res => (lastResult = res));

    component.control.setValue('Angular');
    tick(500);

    expect(lastResult[0].title).toBe('Book Angular');
  }));

  describe('with marbles', () => {
    let scheduler: TestScheduler;

    beforeEach(() => {
      scheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
    });

    it('should debounce terms', () => {
      scheduler.run(({ cold, hot, expectObservable }) => {
        component.term$ = cold('a--b--c--d', {
          a: 'AAAA',
          b: 'BBBB',
          c: 'CCCC',
          d: 'DDDD',
        });

        component.ngOnInit();

        const expectedBooks = [{ title: 'Book DDDD' }];
        expectObservable(component.results$).toBe('--- --- --- 500ms x', { x: expectedBooks });
      });
    });

    it('should ignore short terms', () => {
      scheduler.run(({ cold, hot, expectObservable }) => {
        component.term$ = cold('a 1000ms b 1000ms c 1000ms d', {
          a: 'A',
          b: 'BBBB',
          c: 'C',
          d: 'D',
        });

        component.ngOnInit();

        const expectedBooks = [{ title: 'Book BBBB' }];
        expectObservable(component.results$).toBe('- 1000ms 500ms x', { x: expectedBooks });
      });
    });
  });
});
