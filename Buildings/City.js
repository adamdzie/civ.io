// import { Graphics, Text, app } from "../App.js";

import Building from "./Building.js";
class City extends Building {
  constructor(ownerId, hexCord, isBuilt, ownedHexes) {
    super(ownerId, hexCord, "City", isBuilt, ownedHexes);

    this.ownedHexes = ownedHexes;
  }
}

export default City;
