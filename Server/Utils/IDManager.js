const Queue = require("../DataStructures/Queue.js");
const Constants = require("../Constants.js");
class IDManager {
  constructor() {
    this.available_id = new Queue();
    this.players = new Object();
    this.ids = new Object();
    this.collision_ids = new Queue();

    for (let i = 1; i < Constants.ID_POOL_SIZE; i++) {
      this.available_id.enqueue(i);
    }

    for (let i = 1; i < Constants.ID_POOL_COLLIDER_SIZE; i++) {
      this.collision_ids.enqueue(i);
    }
  }
  getId() {
    return this.available_id.dequeue();
  }
  getColliderId() {
    return this.collision_ids.dequeue();
  }
  AddPlayer(key, value) {
    this.players[key] = value;
    this.ids[value] = key;
  }
}

const singletonInstance = new IDManager();
module.exports = singletonInstance;
