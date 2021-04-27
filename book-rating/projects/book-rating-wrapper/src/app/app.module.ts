import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BookComponent } from 'src/app/books/book/book.component';

@NgModule({
  declarations: [
    // AppComponent
    BookComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [
    // BookComponent
  ]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const webComponent = createCustomElement(BookComponent, { injector: this.injector });
    customElements.define('book-component', webComponent);
  }
 }
