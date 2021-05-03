import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('https://api.angular.schule/books');
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`https://api.angular.schule/books/${ isbn }`)
      // .pipe(
      //   catchError(e => EMPTY)
      // );
  }
}
