const Queue = require("../DataStructures/Queue.js");
const Constants = require("../Constants.js");
class IDManager {
  constructor() {
    this.available_id = new Queue();
    this.players = new Object();
    this.ids = new Object();

    for (let i = 1; i < Constants.ID_POOL_SIZE; i++) {
      this.available_id.enqueue(i);
    }
  }
  getId() {
    return this.available_id.dequeue();
  }
  AddPlayer(key, value) {
    this.players[key] = value;
    this.ids[value] = key;
  }
}

const singletonInstance = new IDManager();
module.exports = singletonInstance;
