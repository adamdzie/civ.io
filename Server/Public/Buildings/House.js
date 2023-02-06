import Building from "./Building.js";
import Grid from "../Grid.js";
import Storage from "../Storage.js";
class House extends Building {
  constructor(ownerId, hexCord, isBuilt) {
    super(ownerId, hexCord, "House", isBuilt);
  }
  complete() {
    super.complete();
  }
}

export default House;
