// import { Graphics, Text, app } from "../App.js";

import Building from "./Building.js";
import Grid from "../Grid.js";
import Storage from "../Storage.js";
class City extends Building {
  constructor(ownerId, hexCord, isBuilt, ownedHexes) {
    super(ownerId, hexCord, "City", isBuilt);

    this.ownedHexes = ownedHexes;
  }
  complete() {
    super.complete();
    this.ownedHexes.forEach((hex) => {
      Grid.map[[hex.x, hex.y]].hexOwner = this.ownerId;
      Grid.map[[hex.x, hex.y]].displayHexOwnage();
    });
  }
}

export default City;
