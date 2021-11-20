/**
 * This file contains a very basic RxJS implementation.
 * It demonstrates OOP and knowledge of some design patterns like the observer pattern.
 * The functions are computed lazily, i.e. only when running .subscribe, and
 * are mappable using the .map method which adheres to functional principles.
 * There are a couple of things missing like the onError emitter and proper unsubscribe handling,
 * which is hinted at with the Subscription type.
 * Normally, an object containing a single method .unsubscribe is returned to dispose the observable.
 */

/*------------------------- Models -------------------------*/
type OnNext<T> = (value: T) => void;
type OnComplete = () => void;

interface Observer<T> {
  onNext: OnNext<T>;
  onComplete: OnComplete;
}

type ObserverOrOnNext<T> = Observer<T> | Observer<T>["onNext"];

type Subscription = {
  unsubscribe: () => void;
} | void;

type Subscriber<T> = (observer: Observer<T>) => Subscription;

/*-------------------------  Implementation -------------------------*/
class Observable<T> {
  private readonly _subscribe: (observer: Observer<T>) => Subscription;

  constructor(_subscribe: Subscriber<T>) {
    this._subscribe = _subscribe;
  }

  subscribe(observerOrNext: ObserverOrOnNext<T>): Subscription {
    if (typeof observerOrNext === "function") {
      return this._subscribe({
        onNext: observerOrNext,
        onComplete: () => {},
      });
    } else {
      return this._subscribe(observerOrNext);
    }
  }

  map(operatorFn: (value: T) => T): Observable<T> {
    return new Observable((observer) => {
      return this.subscribe((value) => {
        observer.onNext(operatorFn(value));
      });
    });
  }

  static of<T>(value: T): Observable<T> {
    return new Observable((observer) => {
      observer.onNext(value);
      observer.onComplete();
    });
  }

  static from<T>(values: T[]): Observable<T> {
    return new Observable((observer) => {
      values.forEach((value) => observer.onNext(value));
      observer.onComplete();
    });
  }
}

/*------------------------- Example -------------------------*/
const observable = Observable.from([1, 2, 3]);

observable
  .map((value) => value * 5)
  .subscribe({
    onNext: (value) => console.log(value),
    onComplete: () => console.log("completed"),
  });
