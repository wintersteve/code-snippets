/**
 * A simple algorithm that further illustrates the usage of Array.prototype.reduce,
 * and TypeScript generics pretty well.
 * The util is grouping a data structure by one of its properties.
 * In case that we have highly frequent searches for certain groups this can enhance the performance,
 * due to the constant lookup time for maps.
 * Beforehand, it requires 0(n) time complexity for the grouping though.
 */

/*------------------------- Models -------------------------*/
type Dict<T> = {
  [key in T as string]: T[];
};

interface User {
  id: number;
  username: string;
  group: "admin" | "standard";
}

type Users = User[];

/*------------------------- Usage -------------------------*/
function groupBy<T>(property: keyof T, arr: T[]): Dict<T> {
  return arr.reduce((dict, obj) => {
    const group = obj[property] as unknown as string;

    return dict[group]
      ? {
          ...dict,
          [group]: [...dict[group], obj],
        }
      : { ...dict, [group]: [obj] };
  }, {} as Dict<T>);
}

/*------------------------- Example -------------------------*/
const users: Users = [
  { id: 0, username: "a", group: "admin" },
  { id: 1, username: "b", group: "standard" },
  { id: 2, username: "c", group: "standard" },
  { id: 3, username: "d", group: "standard" },
];

const groupedByAge = groupBy<User>("group", users);

console.log(groupedByAge);
