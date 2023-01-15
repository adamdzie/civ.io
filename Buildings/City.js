// import { Graphics, Text, app } from "../App.js";

import Building from "./Building.js";
class City extends Building {
  constructor(ownerId, hexCord, isBuilt) {
    super(ownerId, hexCord, "City", isBuilt);
  }
}

export default City;
