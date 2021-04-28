import { Injectable } from '@angular/core';
import { Book } from './book';


const minRating = 1;
const maxRating = 5;

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: book.rating < maxRating ? book.rating + 1 : maxRating
    };
  }

  rateDown(book: Book): Book {
    const rating = Math.max(book.rating - 1, minRating);
    return { ...book, rating };
  }

  rateUpAllowed(book: Book): boolean {
    return book.rating < maxRating;
  }

  rateDownAllowed(book: Book): boolean {
    return book.rating > minRating;
  }
}
