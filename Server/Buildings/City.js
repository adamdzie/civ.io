const Building = require("./Building.js");
const Grid = require("../Grid.js");

class City extends Building {
  constructor(ownerId, hexCord) {
    super(ownerId, hexCord, 0);

    this.ownedHexes = [hexCord];
  }
  BuildingComplete() {
    super.BuildingComplete();

    this.ownedHexes.forEach((hex) => {
      Grid.map[[hex.x, hex.y]].hexOwner = this.ownerId;
    });
  }
}

module.exports = City;
