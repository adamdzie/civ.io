const Building = require("./Building.js");
const Grid = require("../Grid.js");
const { sendToAll } = require("../Utils/Socket-io.js");
const Functions = require("../Functions.js");
class City extends Building {
  constructor(ownerId, hexCord) {
    super(ownerId, hexCord, 0);
    this.ownedHexes = [hexCord];
    this.ownedHexes = this.ownedHexes.concat(
      Functions.getNeighbours(hexCord, 1)
    );

    this.SendBuild();
  }
  BuildingComplete() {
    super.BuildingComplete();

    this.ownedHexes.forEach((hex) => {
      Grid.map[[hex.x, hex.y]].hexOwner = this.ownerId;
    });
  }
  SendBuild() {
    sendToAll("build", [
      this.ownerId,
      this.type,
      this.hexCord,
      this.ownedHexes,
    ]);
  }
}

module.exports = City;
