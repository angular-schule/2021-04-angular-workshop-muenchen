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

  doRateDown(): void {
    this.rateDown.emit(this.book);
  }

  doRateUp(): void {
    this.rateUp.emit(this.book);
  }

  log(): void {
    console.log('CD!', +(new Date()));
  }
}
