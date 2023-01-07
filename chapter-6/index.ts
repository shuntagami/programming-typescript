// サーバーから取得した既存のユーザー
type ExistingUser = {
  id: number;
  name: string;
};
// サーバーにまだ保存されていない新規のユーザー
type NewUser = {
  name: string;
};

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
}
let existingUser: ExistingUser = {
  id: 123456,
  name: "Ima User",
};
deleteUser(existingUser);

type LegacyUser = {
  id?: number | string;
  name: string;
};
let legacyUser: LegacyUser = {
  id: "793331",
  name: "Xin Yang",
};
// deleteUser(legacyUser);

// 過剰プロパティチェック
type Options = {
  baseURL: string;
  cacheSize?: number;
  tier?: "prod" | "dev";
};
class API {
  constructor(private options: Options) {}
}
new API({
  baseURL: "https://api.mysite.com",
  tier: "prod",
});

// new API({
//   baseURL: "https://api.mysite.com",
//   tierr: "prod", // エラー TS2345: 型 '{ baseURL: string; tierr: string; }' の引数
// });

new API({
  baseURL: "https://api.mysite.com",
  badTier: "prod",
} as Options);

let badOptions = {
  baseURL: "https://api.mysite.com",
  badTier: "prod",
};
new API(badOptions);

// let options: Options = {
//   baseURL: "https://api.mysite.com",
//   badTier: "prod", // エラー TS2322: 型 '{ baseURL: string; badTier: string; }'
// }; // を型 'Options' に割り当てることはできません。
// new API(options);

// Map型
type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type Day = Weekday | "Sat" | "Sun";
let nextDay: Record<Weekday, Day> = {
  Mon: "Tue",
  Tue: "Wed",
  Wed: "Thu",
  Thu: "Fri",
  Fri: "Sat",
};

// let nextDay: { [K in Weekday]: Day } = {
//   Mon: "Tue",
//   Tue: "Wed",
//   Wed: "Thu",
//   Thu: "Fri",
//   Fri: "Sat",
// };

function getNextDay(w: Weekday): Day {
  switch (w) {
    case "Mon":
      return "Tue";
    default:
      return "Fri";
  }
}

type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

// すべてのフィールドを省略可能にします
type OptionalAccount = {
  [K in keyof Account]?: Account[K];
};

// すべてのフィールドをnull許容にします
type NullableAccount = {
  [K in keyof Account]: Account[K] | null;
};

// すべてのフィールドを再び書き込み可能にします（Accountと同等）
type Account2 = {
  -readonly [K in keyof ReadonlyAccount]: Account[K];
};

// すべてのフィールドを読み取り専用にします
type ReadonlyAccount = {
  readonly [K in keyof Account]: Account[K];
};

// すべてのフィールドを再び必須にします（Accountと同等）
type Account3 = {
  [K in keyof OptionalAccount]-?: Account[K];
};

// ルックアップ型
type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

type FriendList = APIResponse["user"]["friendList"];

type ResponseKeys = keyof APIResponse; // 'user'
type UserKeys = keyof APIResponse["user"]; // 'userId' | 'friendList'
type FriendListKeys = keyof APIResponse["user"]["friendList"]; // 'count' | 'friends'

// function getAPIResponse(): Promise<APIResponse> {
//   // ...
// }
// function renderFriendList(friendList: FriendList) {
//   // ...
// }
// let response = await getAPIResponse();
// let friendList = renderFriendList(response.user.friendList);

// function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
//   return o[k];
// }

type ActivityLog = {
  lastEvent: Date;
  events: {
    id: string;
    timestamp: Date;
    type: "Read" | "Write";
  }[];
};
let activityLog: ActivityLog = {
  lastEvent: new Date("December 17, 1995 03:24:00"),
  events: [],
};
// let lastEvent = get(activityLog, "lastEvent"); // Date

let sample = activityLog["lastEvent"]; // この書き方だとtypoに気付けない

type Get = {
  <O extends object, K1 extends keyof O>(o: O, k1: K1): O[K1];
  <O extends object, K1 extends keyof O, K2 extends keyof O[K1]>(
    o: O,
    k1: K1,
    k2: K2
  ): O[K1][K2];
  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2]
  >(
    o: O,
    k1: K1,
    k2: K2,
    k3: K3
  ): O[K1][K2][K3];
};
let get: Get = (object: any, ...keys: string[]) => {
  let result = object;
  keys.forEach((k) => (result = result[k]));
  return result;
};
get(activityLog, "events", 0, "type"); // 'Read' | 'Write'
// get(activityLog, "bad"); // Argument of type '"bad"' is not assignable to parameter of type 'keyof ActivityLog'

// コンパニオンオブジェクトパターン
// 同じ名前を共有するオブジェクトとクラスをペアにする
type Unit = "EUR" | "GBP" | "JPY" | "USD";

type Currency = {
  unit: Unit;
  value: number;
};

let Currency = {
  from(value: number, unit: Unit): Currency {
    return {
      unit: unit,
      value,
    };
  },
};

// Currencyを型として使う
let amountDue: Currency = {
  unit: "JPY",
  value: 83733.1,
};
let otherAmountDue = Currency.from(330, "EUR"); // Currencyを値として使う
