import Building from "./Building.js";
import Grid from "../Grid.js";
import Storage from "../Storage.js";
class Bank extends Building {
  constructor(ownerId, hexCord, isBuilt) {
    super(ownerId, hexCord, "Bank", isBuilt);
  }
  complete() {
    super.complete();
  }
}

export default Bank;
