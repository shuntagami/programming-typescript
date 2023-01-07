type Message = string;
type ThreadID = number;
type UserID = number;
type Participants = UserID[];
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
let worker = new Worker("WorkerScript.js");

worker.onmessage = (e) => {
  console.log(e.data); // 'Ack: "some data"'とログに出力します
};
worker.postMessage("some data");
