const Building = require("./Building");
const Grid = require("../Grid.js");

class City extends Building {
  constructor(ownerId, hexCord) {
    super(ownerId, hexCord);

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
