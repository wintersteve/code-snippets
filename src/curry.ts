/**
 * A major functional programming concept.
 * It illustrates partial application nicely,
 * and shows that we can define functions in terms of other functions.
 * Increment is defined as add(1).
 * Decrement could be add(-1).
 * Also a nice example of JavaScript's closure.
 *

/*------------------------- Implementation -------------------------*/
function curry<T>(fn: CallableFunction): CallableFunction {
  return function curried<T>(...args: T[]): CallableFunction {
    return args.length >= fn.length
      ? fn(...args)
      : curried.bind(curried, ...args);
  };
}

/*------------------------- Example -------------------------*/
const add = (a: number, b: number): number => a + b;

const increment = curry(add)(1);

console.log(increment(12));
