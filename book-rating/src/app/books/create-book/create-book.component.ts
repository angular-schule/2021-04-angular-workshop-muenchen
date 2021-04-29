import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {

  bookForm = new FormGroup({
    isbn: new FormControl('xxx', [Validators.required, Validators.minLength(3)]),
    title: new FormControl('', Validators.required),
    description: new FormControl()
  });

  isValid(name: string): boolean {
    const control = this.bookForm.get(name);
    return control.touched && control.invalid
  }

  submitForm(): void {

    const newBook = {
      ...this.bookForm.value,
      rating: 1
    }

    // Hands On
    // 1. Emitiere ein Event mit dem Namen `create` (Nutzlast `newBook`)
    // 2. Subscribe dich im Dashboard auf das Event
    // 3. Füge das neue Buch dem Buch-Array hinzu


    this.bookForm.reset();
  }

}
