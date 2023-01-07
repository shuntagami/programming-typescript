import { EventEmitter } from "events";

// type Command =
//   | { type: "sendMessageToThread"; data: [ThreadID, Message] }
//   | { type: "createThread"; data: [Participants] }
//   | { type: "addUserToThread"; data: [ThreadID, UserID] }
//   | { type: "removeUserFromThread"; data: [ThreadID, UserID] };

// onmessage = (e) => {
//   console.log(e.data); // 'some data'とログに出力します
//   postMessage(`Ack: "${e.data}"`);
// };

// onmessage = (e) => processCommandFromMainThread(e.data);
// function processCommandFromMainThread(command: Command) {
//   switch (command.type) {
//     case "sendMessageToThread":
//       let [threadID, message] = command.data;
//       console.log(message);
//     // ...
//   }
// }

interface SafeEmitter<Events extends Record<PropertyKey, unknown[]>> {
  emit<K extends keyof Events>(channel: K, ...data: Events[K]): boolean;
  on<K extends keyof Events>(
    channel: K,
    listener: (...data: Events[K]) => void
  ): this;
  on(channel: never, listener: (...data: unknown[]) => void): this;
}

type Commands = {
  sendMessageToThread: [ThreadID, Message];
  createThread: [Participants];
  addUserToThread: [ThreadID, UserID];
  removeUserFromThread: [ThreadID, UserID];
};

type Events = {
  receivedMessage: [ThreadID, UserID, Message];
  createdThread: [ThreadID, Participants];
  addedUserToThread: [ThreadID, UserID];
  removedUserFromThread: [ThreadID, UserID];
};

// メインスレッドから送られてくるイベントをリッスンします
let commandEmitter: SafeEmitter<Commands> = new EventEmitter();
// メインスレッドに対してイベントを発行します
let eventEmitter: SafeEmitter<Events> = new EventEmitter();
// 型安全なイベントエミッターを使って、
// メインスレッドからの入力コマンドをラップします
onmessage = (command) =>
  commandEmitter.emit(command.data.type, ...command.data.data);
// Workerによって発行されたイベントをリッスンし、それらをメインスレッドに送信します
eventEmitter.on("receivedMessage", (data) =>
  postMessage({ type: "receivedMessage", data })
);
eventEmitter.on("createdThread", (data) =>
  postMessage({ type: "createdThread", data })
);
// その他のイベントも同様
// メインスレッドからのsendMessageToThreadコマンドに応答します
commandEmitter.on("sendMessageToThread", (threadID, message) =>
  console.log(`OK, I will send a message to threadID ${threadID}`)
);
// メインスレッドにイベントを送り返します
eventEmitter.emit("createdThread", 123, [456, 789]);
