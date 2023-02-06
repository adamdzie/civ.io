import Building from "./Building.js";
import Grid from "../Grid.js";
import Storage from "../Storage.js";
class Amphitheatre extends Building {
  constructor(ownerId, hexCord, isBuilt) {
    super(ownerId, hexCord, "Amphitheatre", isBuilt);
  }
  complete() {
    super.complete();
  }
}

export default Amphitheatre;
