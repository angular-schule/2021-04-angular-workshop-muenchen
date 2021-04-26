import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[];

  constructor() { }

  ngOnInit(): void {
    this.books = [{
      isbn: '000',
      title: 'Angular',
      description: 'tolles Buch',
      rating: 5
    }, {
      isbn: '111',
      title: 'AngularJS',
      description: 'alter Buch',
      rating: 3
    }, {
      isbn: '222',
      title: 'Ext.JS',
      description: 'tolles Buch, aber Lizenz zu teuer!',
      rating: 1
    }];
  }

}
