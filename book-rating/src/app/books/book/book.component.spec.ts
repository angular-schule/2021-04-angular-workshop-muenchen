import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = {
      isbn: '000',
      title: '',
      description: '',
      rating: 1
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
