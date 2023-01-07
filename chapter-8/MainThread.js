// import { Worker } from "worker_threads";
// const { Worker, isMainThread, parentPort } = require("worker_threads");
var worker = new Worker("WorkerScript.js");
worker.onmessage = function (e) {
    console.log(e.data); // 'Ack: "some data"'とログに出力します
};
worker.postMessage("some data");
