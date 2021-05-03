import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';


@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  result$ = this.router.paramMap.pipe(
    map(paramMap => paramMap.get('isbn')),
    map(isbn => this.bs.getSingle(isbn))
  );

  constructor(private router: ActivatedRoute, private bs: BookStoreService) {
  }

}
