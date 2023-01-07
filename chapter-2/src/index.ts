console.log("Hello TypeScript!");

let d = [true, true, false];
let e = { type: "ficus" };
let f = [1, false];
let h = null;

let greet3 = (name: string) => {
  return "hello " + name;
};

let greet5 = new Function("name", 'return "hello " + name');

function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

function fancyDate(this: Date) {
  return `${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`;
}

let numbers = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n;
    }
  },
};

type Log = (message: string, userId?: string) => void;
let log: Log = (message, userId = "Not signed in") => {
  let time = new Date().toISOString();
  console.log(time, message, userId);
};

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
  (destination: string): Reservation;
};

let reserve2: Reserve = (from, to, destination) => {};

let reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // 宿泊旅行を予約する
  } else if (typeof toOrDestination === "string") {
    // 日帰り旅行を予約する
  }
  // ...
};

type WarnUser = {
  (warning: string): void;
  wasCalled: boolean;
};
function warnUser(warning: string) {
  if (warnUser.wasCalled) {
    return;
  }
  warnUser.wasCalled = true;
  console.log(warning);
}
warnUser.wasCalled = false;

const assignedWarnUser: WarnUser = warnUser;

function filter(array, f) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
}

// type Filter = {
//   (array: number[], f: (item: number) => boolean): number[];
//   (array: string[], f: (item: string) => boolean): string[];
// };

type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

let names = [
  { firstName: "beth" },
  { firstName: "caitlyn" },
  { firstName: "xin" },
];
let result = filter(names, (_) => _.firstName.startsWith("b")); // エラー TS2339: プロパティ 'firstName' は型 'object' に存在しません。
result[0].firstName;

// function map(array: unknown[], f: (item: unknown) => unknown): unknown[] {
//   let result = [];
//   for (let i = 0; i < array.length; i++) {
//     result[i] = f(array[i]);
//   }
//   return result;
// }

function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}
