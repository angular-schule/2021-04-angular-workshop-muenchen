import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // macht den Turbo rein!
})
export class BookComponent {

  @Input()
  book: Book;
}
