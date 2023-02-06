import Building from "./Building.js";
import Grid from "../Grid.js";
import Storage from "../Storage.js";
class Lab extends Building {
  constructor(ownerId, hexCord, isBuilt) {
    super(ownerId, hexCord, "Lab", isBuilt);
  }
  complete() {
    super.complete();
  }
}

export default Lab;
