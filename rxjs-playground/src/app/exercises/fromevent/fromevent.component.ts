import { Component, OnInit } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { map, startWith, debounceTime, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './fromevent.component.html',
})
export class FromeventComponent implements OnInit {

  currentWidth = 0;

  ngOnInit() {

    /**
     * Schreibe die jeweils aktuelle Fensterbreite in das Property `this.currentWidth`
     *
     * Nutze fromEvent, um das resize-Event auf window zu abonnieren.
     * Initialisiere das Observable mit der aktuellen Fensterbreite (`window.innerWidth`)
     * Entprelle den Eventstrom, damit nicht zu viele Events gefeuert werden.
     */

    /******************************/

    fromEvent(window, 'resize').pipe(
        map((e: Event) => (e.target as Window).innerWidth),
        // map(() => window.innerWidth)
        debounceTime(1000),
        tap(console.log),
        delay(2000),
        startWith(window.innerHeight),
      )
      .subscribe(width => this.currentWidth = width)

    /******************************/
  }

}
