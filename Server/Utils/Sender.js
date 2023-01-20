const Queue = require("../DataStructures/Queue.js");
const {
  socketConnection,
  sendToClient,
  sendToAll,
} = require("../Utils/Socket-io.js");

class Sender {
  constructor() {
    this.queue = new Queue();
  }

  //0 to all
  //1 to client
  execute() {
    if (!this.queue.isEmpty) {
      console.log("SEND");
      for (let i = 0; i < this.queue.length; i++) {
        let toSend = this.queue.dequeue();
        console.log(toSend["type"]);
        if (toSend["type"] === 0) {
          sendToAll(toSend["namespace"], toSend["args"]);
        }
      }
    }
  }
}

const singletonInstance = new Sender();

module.exports = singletonInstance;
