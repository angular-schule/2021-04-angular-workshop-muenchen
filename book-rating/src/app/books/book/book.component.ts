import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // macht den Turbo rein!
})
export class BookComponent {

  @Output()
  rateDown = new EventEmitter<Book>();

  @Output()
  rateUp = new EventEmitter<Book>();

  @Input()
  book: Book;

  @Input()
  rateDownAllowed = (book: Book) => true

  @Input()
  rateUpAllowed = (book: Book) => true

  doRateDown(): void {
    this.rateDown.next(this.book);
  }

  doRateUp(): void {
    this.rateUp.next(this.book);
  }

  log(): void {
    console.log('CD!', +(new Date()));
  }
}
