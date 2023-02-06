const Building = require("./Building.js");
const Grid = require("../Grid.js");
const { sendToAll } = require("../Utils/Socket-io.js");
const Functions = require("../Functions.js");
const Sender = require("../Utils/Sender.js");
const Serializer = require("../Utils/Serializer.js");

class Amphitheatre extends Building {
  constructor(ownerId, hexCord) {
    super(ownerId, hexCord, 4, 0, 0, 0, 1);

    this.SendBuild();
  }
  BuildingComplete() {
    super.BuildingComplete();
  }
  SendBuild() {
    let _data = Serializer.Build(this.ownerId, this.type, this.hexCord);
    sendToAll("build", _data);
  }
}

module.exports = Amphitheatre;
