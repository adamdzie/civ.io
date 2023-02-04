import City from "./City.js";
import Building from "./Building.js";
import Bank from "./Bank.js";
import Grid from "../Grid.js";
import { getRing } from "../Utils/Functions.js";
import Enums from "../Utils/Enums.js";
class BuildingFactory {
  static BuildCity(id, hexCord, isBuilt, ownedHexes) {
    return new City(id, hexCord, isBuilt, ownedHexes);
  }
  static Build(id, type, hexCord, isBuilt) {
    if (type === 0) {
      let ownedHexes = [hexCord];
      ownedHexes = ownedHexes.concat(getRing(hexCord, 1));
      return new City(id, hexCord, isBuilt, ownedHexes);
    }
    if (type === 1) {
      return new Bank(id, hexCord, isBuilt);
    }
  }
}

export default BuildingFactory;
