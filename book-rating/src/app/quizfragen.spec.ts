import { from, of, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

/*
In the context of TestScheduler, a marble diagram is a string containing special
syntax representing events happening over virtual time. Time progresses by frames.

The first character of any marble string always represents the zero frame,
or the start of time. Inside of testScheduler.run(callback) the frameTimeFactor
is set to 1, which means one frame is equal to one virtual millisecond.

see https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/testing/marble-testing.md#marble-syntax
*/

describe('RxJS Quizfragen', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it(`1. Welche Ausgabe im Marblediagramm erzeugt of('A', 'B', 'C') ?`, () => {
    scheduler.run(({ cold, hot, expectObservable }) => {

      const input = of('A', 'B', 'C') ;
      expectObservable(input).toBe('(abc|)',
        {
          a: 'A',
          b: 'B',
          c: 'C'
        });
    });
  });

  it(`2. Welche Ausgabe im Marblediagramm erzeugt from(['A', 'B', 'C']) ?`, () => {
    scheduler.run(({ cold, hot, expectObservable }) => {

      const input = from(['A', 'B', 'C']) ;
      expectObservable(input).toBe('(abc|)',
        {
          a: 'A',
          b: 'B',
          c: 'C'
        });
    });
  });

  it(`3. Welche Ausgabe im Marblediagramm erzeugt timer(1000, 500) ?`, () => {
    scheduler.run(({ cold, hot, expectObservable }) => {

      const input = timer(1000, 500).pipe(take(4));
      expectObservable(input).toBe('1000ms a 499ms b 499ms c 499ms (d|)',
        {
          a: 0,
          b: 1,
          c: 2,
          d: 3
        });
    });
  });
});
