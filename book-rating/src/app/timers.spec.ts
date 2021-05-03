import { fakeAsync, tick, waitForAsync } from '@angular/core/testing';

describe('Async Timers', () => {
  it('should test a timer (with done)', done => {
    let flag: boolean;

    setTimeout(() => {
      flag = true;
      expect(flag).toBe(true);
      done();
    }, 500);
  });

  it('should test a timer (with waitForAsync)', waitForAsync(() => {
    let flag: boolean;

    setTimeout(() => {
      flag = true;
      expect(flag).toBe(true);
    }, 4800);
  }));

  // jasmine.clock
  // jtest.useFakeTimers
  /*
  it('should test a timer (with Jest Timer Mocks)', () => {
    jest.useFakeTimers();

    let flag: boolean;

    setTimeout(() => {
      flag = true;
    }, 500);

    jest.advanceTimersByTime(500);
    expect(flag).toBe(true);

    jest.useRealTimers();
  });
  */

  it('should test a timer (with fakeAsync/tick)', fakeAsync(() => {
    let flag: boolean;

    setTimeout(() => {
      flag = true;
    }, 500);

    tick(500);

    expect(flag).toBe(true);
  }));
});
