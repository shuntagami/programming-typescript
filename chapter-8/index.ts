import { readFile } from "fs";

// type Executor = (resolve: Function, reject: Function) => void;
type Executor<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void
) => void;

// class Promise2 {
//   constructor(f: Executor) {}
// }
// class Promise<T, E extends Error> {
//   constructor(f: Executor<T, E>) {}
//   then<U, F extends Error>(g: (result: T) => Promise<U, F> | U): Promise<U, F>;
//   catch<U, F extends Error>(g: (error: E) => Promise<U, F> | U): Promise<U, F>;
// }
class Promise<T> {
  constructor(f: Executor<T>) {}
  then<U>(g: (result: T) => Promise<U> | U): Promise<U> {
  // ...
  }
  catch<U>(g: (error: unknown) => Promise<U> | U): Promise<U> {
  // ...
  }
}

function appendAndReadPromise(path: string, data: string): Promise<string> {
  return appendPromise(path, data)
    .then(() => readPromise(path))
    .catch((error) => console.error(error));
}

function readFilePromise(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

let a: () => Promise<string, TypeError> = // ...
let b: (s: string) => Promise<number, never> = // ...
let c: () => Promise<boolean, RangeError> = // ...
