import { TestBed } from '@angular/core/testing';
import { Book } from './book';

import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {

  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    service = new BookRatingService();
    book = {
      isbn: '000',
      title: 'Test',
      description: 'asasas',
      rating: 3
    };
  });

  it('should rate up a book by one', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(4);
  });

  it('should rate down a book by one', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not be allowed to have a rating greater than 5', () => {
    book.rating = 5;
    const rateBook = service.rateUp(book);
    expect(rateBook.rating).toBe(5);
  });

  it('should not be allowed to have a rating smaller than 1', () => {
    book.rating = 1;
    const rateBook = service.rateDown(book);
    expect(rateBook.rating).toBe(1);
  });

  it('should always return a new book instance (assuming immutability)', () => {
    const rateBook = service.rateUp(book);
    expect(rateBook).not.toBe(book);

    const rateBook2 = service.rateDown(book);
    expect(rateBook2).not.toBe(book);
  });
});
