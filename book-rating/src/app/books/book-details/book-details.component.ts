import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  // $result =

  isbn: string;

  constructor(private router: ActivatedRoute) {
    debugger;
    this.isbn = router.snapshot.paramMap.get('isbn');
  }

}
