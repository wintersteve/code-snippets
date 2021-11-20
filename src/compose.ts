/**
 * Since we were talking about functional programming, I assumed that this example
 * demonstrates nicely a basic understanding of functional concepts.
 * The functions declared in this module are pure, do not cause any side-effects,
 * are point-free and composable.
 */

/*------------------------- Implementation -------------------------*/
function compose<T>(f1: (a: T) => T, ...fns: Function[]): (a: any) => T {
  return (value: T): T =>
    fns.reduceRight((result, fn) => fn(result), f1(value));
}

/*------------------------- Example -------------------------*/
const addExclamation = (str: string): string => str + "!";
const toUpper = (str: string): string => str.toUpperCase();

const shout = compose(addExclamation, toUpper);

console.log(shout("Hey there"));
