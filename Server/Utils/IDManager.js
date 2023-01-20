const Queue = require("../DataStructures/Queue.js");
const Constants = require("../Constants.js");
class IDManager {
  constructor() {
    this.available_id = new Queue();

    for (let i = 1; i < Constants.ID_POOL_SIZE; i++) {
      this.available_id.enqueue(i);
    }
  }
  getId() {
    return this.available_id.dequeue();
  }
}
