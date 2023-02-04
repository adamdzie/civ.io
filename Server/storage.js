class Storage {
  constructor() {
    this.PlayerList = new Object();
    this.IdList = new Object();
  }
  Add(key, value) {
    this.PlayerList[key] = value;
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

module.exports = singletonInstance;
