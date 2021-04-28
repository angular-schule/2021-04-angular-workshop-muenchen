import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    const bookRatingMock = {
      rateUp: book => book,
      rateUpAllowed: () => true,
      rateDownAllowed: () => true
    };

    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        BookComponent
      ],
      providers: [
        {
          provide: BookRatingService,
          useValue: bookRatingMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doRateUp() should forward the task to BookRatingService', () => {

    const rs = TestBed.inject(BookRatingService);
    spyOn(rs, 'rateUp').and.callThrough();

    const testBook = { isbn: 'xxx' } as Book;
    component.doRateUp(testBook);

    // expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
