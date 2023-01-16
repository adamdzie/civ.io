import { Player } from "./Player.js";

class Storage {
  constructor() {
    this.PlayerList = new Object();
  }
  Add(key, player) {
    this.PlayerList[key] = new Player(
      player.position,
      player.radius,

      player.move_speed
    );
  }
  Remove(key) {
    delete this.PlayerList[key];
  }
  GetPlayer(key) {
    return this.PlayerList[key];
  }
  Size() {
    return Object.keys(this.PlayerList).length;
  }
}

const singletonInstance = new Storage();

export default singletonInstance;
