import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush // Vorsicht: fieser Bug, sobald wir AJAX machen!
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(public br: BookRatingService,
              public bs: BookStoreService) {
  }

  ngOnInit(): void {
    this.bs.getAll().subscribe(books => this.books = books);
  }

  doRateDown(book: Book): void {
    const ratedBook = this.br.rateDown(book);
    this.updateAndSortBooks(ratedBook);
  }

  doRateUp(book: Book): void {
    const ratedBook = this.br.rateUp(book);
    // const ratedBook =  {
    //   ...book,
    //   rating: book.rating < 5 ? book.rating + 1 : 5
    // };
    this.updateAndSortBooks(ratedBook);
  }

  updateAndSortBooks(ratedBook: Book): void {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);
  }

  addBook(newBook: Book) {
    this.books = [...this.books, newBook];
  }
}
